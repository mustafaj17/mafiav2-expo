import React from 'react'
import {View, Text, BackHandler, ToastAndroid, Button,} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';
import PlayersList from '../../../../components/playersList';
import ReadyButton from '../../../../components/playerReadyButton';

class InRound extends React.Component {
    static navigationOptions = {
        header: {
            visible: false,
        }
    }

    state = {
        timer: 10
    }

    screenWillFocus= () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.setTimer()
    }

    setTimer = () => {
        this.timer = setInterval( ()=> {
            const newTime = this.state.timer-1;
            if(newTime === 0){
                this.endRound();
            }else{
                this.setState({ timer: newTime})
            }
        }, 1000);
    };

    endRound = () => {
        clearInterval(this.timer);
        this.props.navigation.navigate('InVote');
    }

    handleBackButton = () => {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    screenWillBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        const { currentPlayer, gameDoc, gameData } = this.props;

        if(gameData.roundSkipped){
            this.endRound();
            return null;
        }

        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />

               <Text> InRound </Text>
               <Text> {this.state.timer} </Text>

               { currentPlayer.isAdmin &&
               <Button title="Skip round" onPress={ () => {
                   gameDoc.ref.update( 'roundSkipped', true)
               }} />

               }

           </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data,
    gameData: state.game.gameData,
    gameDoc: state.game.gameDoc,
    currentPlayer: state.game.playersData.find( player => player.displayName === state.user.data.displayName),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InRound);