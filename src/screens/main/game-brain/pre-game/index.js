import React from 'react'
import {View, Text, BackHandler, ToastAndroid, TouchableOpacity, Button} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';
import PlayersList from '../../../../components/playersList';
import ReadyButton from '../../../../components/playerReadyButton';

class PreGame extends React.Component {

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

    componentDidMount(){
        const { user } = this.props;
        const gameRef = this.props.gameDoc.ref;
        const playersColRef = gameRef.collection('players');

        playersColRef.doc(user.email).set({
            uid: user.uid,
            displayName: user.displayName
        });


        const disconnectFromPlayerCollection = playersColRef.onSnapshot(querySnapshot => {
            const players = [];

            querySnapshot.forEach( playerDocument => {
                players.push(playerDocument.data())
            })

            this.props.updatePlayersData(players);
        });

        this.props.setPlayersDisconnect(disconnectFromPlayerCollection);



        const disconnectFromGame = gameRef.onSnapshot(doc => {
            this.props.updateGameData(doc.data());
        });

        this.props.setGameDisconnect(disconnectFromGame);
    }

    handleGameStart = () => {

    }

    render() {

        const { gameData, playerRequirementMet, currentPlayer, navigation, allPlayersAreReady } = this.props;

        if(playerRequirementMet && allPlayersAreReady) {
            navigation.navigate('InRound');
            return null;
        }

        return (
          <View style={styles.page}>

              <NavigationEvents
                onWillFocus={this.screenWillFocus}
                onWillBlur={this.screenWillBlur}
              />

              <View><Text>{gameData.gameName}</Text></View>
              <PlayersList/>

              <TouchableOpacity onPress={ () =>  navigation.navigate('InRound') }>
                  <View><Text>GO</Text></View>
              </TouchableOpacity>

              {playerRequirementMet &&
              <Button
                onPress={this.handleStartGame}
                title='Learn More'
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(PreGame);