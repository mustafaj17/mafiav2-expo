import React from 'react'
import {View, Text, BackHandler, ToastAndroid } from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';
import PlayersList from '../../../../components/playersList';
import ReadyButton from '../../../../components/playerReadyButton';

class PreRound extends React.Component {
    static navigationOptions = {
        header: null
    }

    screenWillFocus= () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    screenWillBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {

        const { gameData, playerRequirementMet, currentPlayer, navigation, allPlayersAreReady } = this.props;

            if(allPlayersAreReady) {
                navigation.navigate('InRound');
                return null;
            }

        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />
               <View><Text>Pre-Round Screen</Text></View>

               <View><Text>{gameData.gameName}</Text></View>
               <PlayersList/>

               {!currentPlayer.ready &&
                <ReadyButton/>
               }

           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameDoc: state.game.gameDoc,
    gameData: state.game.gameData,
    playersData: state.game.playersData,
    currentPlayer: state.game.playersData.find( player => player.displayName === state.user.data.displayName),
    allPlayersReady: state.game.allPlayersReady,
    playerRequirementMet: (state.game.playersData.length > 0),
    user: state.user.data,
    allPlayersAreReady: state.game.playersData.reduce( (allReady,player) => (allReady && !!player.ready), true)
})

const mapDispatchToProps = dispatch => ({
    updateGameData: data => dispatch(updateGameData(data)),
    updatePlayersData: data => dispatch(updatePlayersData(data)),
    setGameDisconnect: gameDisconnect => dispatch(setGameDisconnect(gameDisconnect)),
    setPlayersDisconnect: playersDisconnect => dispatch(setPlayersDisconnect(playersDisconnect))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreRound);