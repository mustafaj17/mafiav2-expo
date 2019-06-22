import React from 'react'
import {View, Text, BackHandler, ToastAndroid, Button} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';
import PlayersList from '../../../../components/playersList';
import { firestore } from '../../../../services/firebase'
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
            displayName: user.displayName,
            email: user.email
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

    setPlayerTypes = () => {

        const players = [...this.props.playersData];
        let mafiaCount;

        switch (true) {
            case (players.length < 5):
                mafiaCount = 1;
                break;
            case (players.length < 8):
                mafiaCount = 2;
                break;
            case (players.length < 11):
                mafiaCount = 3;
                break;
            case (players.length < 14):
                mafiaCount = 4;
                break;
            case (players.length < 16):
                mafiaCount = 5;
                break;
            default:
                mafiaCount = 6;
                break
        }

        while (mafiaCount) {
            let rand = Math.floor(Math.random() * players.length);
            if (!players[rand].type) {
                players[rand].type = 'Mafia';
                mafiaCount--;
            }
        }

        return players;
    }

    handleStartGame = () => {
        const { gameDoc, navigation } = this.props;

        const players = this.setPlayerTypes();

        players.forEach( player => {
            if(!player.type) {
                player.type = 'Civilian'
            }
        });

        const batch = firestore.batch();
        batch.update(gameDoc.ref, {gameStarted: true});
        players.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {type: player.type});
        });

        batch.commit().then( () => {
            console.log('game started and player types set');
            navigation.navigate('PreRound');
        }).catch( e => {
            console.log('error starting game and setting player types: ', e );
        })


    }

    render() {

        const { gameData, playerRequirementMet, navigation, allPlayersAreReady } = this.props;

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

              <View><Text>Pre-Game Screen</Text></View>

              <View><Text>{gameData.gameName}</Text></View>
              <PlayersList/>

              {playerRequirementMet &&
              <Button
                onPress={this.handleStartGame}
                title='Start Game'
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