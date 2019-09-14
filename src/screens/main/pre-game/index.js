import React from 'react'
import {View, Text, Button} from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../redux/actions/gameActions';
import PlayersList from '../../../components/playersList';
import { firestore } from '../../../services/firebase'
import {areAllPlayersReady, getCurrentPlayer} from "../../../redux/selectors";
import {TYPE} from "../../../constants";
import {connectedToGameDoc, connectedToPlayerCollection, setLoading} from "../../../redux/actions/loadingActions";

class PreGame extends React.Component {


    componentDidMount(){
        const { user, gameDoc, setConnectedToPlayerCollection, setConnectedToGameDoc, connectedToPlayersCollection, connectedToGameDoc } = this.props;
        const playersColRef = gameDoc.ref.collection('players');

        playersColRef.doc(user.data.email).set({
            uid: user.data.uid,
            displayName: user.data.displayName,
            email: user.data.email,
            isAdmin: !!user.isAdmin
        });

        const disconnectFromPlayerCollection = playersColRef.onSnapshot(querySnapshot => {

            console.log('players onSnapshot')
            const players = [];

            querySnapshot.forEach( playerDocument => {
                players.push(playerDocument.data())
            })

            this.props.updatePlayersData(players);

            if(!connectedToPlayersCollection){
                setConnectedToPlayerCollection()
            }
        });

        this.props.setPlayersDisconnect(disconnectFromPlayerCollection);



        const disconnectFromGame = gameDoc.ref.onSnapshot(doc => {



            console.log('game onSnapshot');

            this.props.updateGameData(doc.data());

            if(!connectedToGameDoc){
                setConnectedToGameDoc();
            }
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
                players[rand].type = TYPE.MAFIA;
                mafiaCount--;
            }
        }

        return players;
    }

    handleStartGame = () => {
        const { gameDoc } = this.props;

        const players = this.setPlayerTypes();

        players.forEach( player => {
            if(!player.type) {
                player.type = TYPE.CIVILIAN;
            }
        });

        const batch = firestore.batch();
        batch.update(gameDoc.ref, {gameStarted: true});
        players.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {type: player.type});
        });

        batch.commit().then( () => {
            console.log('game started and player types set');
        }).catch( e => {
            console.log('error starting game and setting player types: ', e );
        })


    }

    shouldComponentUpdate(nextProps){
        const { navigation, gameData } = nextProps;

        if(gameData.gameStarted) {
            navigation.navigate('PreRound');
            return false;
        }

        return true;
    }

    startTestGame = () => {

        const { gameDoc, navigation, currentPlayer } = this.props;

        const testPlayers = [
            {
                email: 'test1@email.com',
                type: TYPE.CIVILIAN,
                displayName: 'Pop1',
                ready: true
            },
            {
                email: 'test2@email.com',
                type: TYPE.CIVILIAN,
                displayName: 'Pop2',
                ready: true
            },
            {
                email: 'test3@email.com',
                type: TYPE.CIVILIAN,
                displayName: 'Pop3',
                ready: true
            },
            {
                email: 'test4@email.com',
                type: TYPE.MAFIA,
                displayName: 'Pop4',
                ready: true
            },
            {
                email: 'test5@email.com',
                type: TYPE.MAFIA,
                displayName: 'Pop5',
                ready: true
            }
        ]

        const batch = firestore.batch();

        batch.update(gameDoc.ref, {gameStarted: true});
        testPlayers.forEach(player => {
            batch.set(gameDoc.ref.collection('players').doc(player.email), {...player});
        });

        batch.update(gameDoc.ref.collection('players').doc(currentPlayer.email), {type : TYPE.MAFIA});

        batch.commit().then( () => {
            console.log('game started and player types set');
            navigation.navigate('PreRound');
        }).catch( e => {
            console.log('error starting game and setting player types: ', e );
        })
    }

    render() {

        const { gameData, currentPlayer, connectedToGameDoc, connectedToPlayersCollection } = this.props;

        if(!connectedToGameDoc || !connectedToPlayersCollection){
            return(<View><Text>Loading</Text></View>)
        }

        return (
          <View style={styles.page}>

              <View><Text>Pre-Game Screen</Text></View>

              <View><Text>{gameData.gameName}</Text></View>
              <PlayersList/>

              {currentPlayer.isAdmin &&
              <Button
                onPress={this.handleStartGame}
                title='Start Game'
              />
              }


              <Button onPress={this.startTestGame} title={'Start Test Game'}/>
          </View>
        )
    }
}


const mapStateToProps = state => ({
    gameDoc: state.game.gameDoc,
    gameData: state.game.gameData,
    playersData: state.game.playersData,
    currentPlayer: getCurrentPlayer(state),
    playerRequirementMet: (state.game.playersData.length > 0),
    user: state.user,
    allPlayersAreReady: areAllPlayersReady(state),
    connectedToPlayersCollection: state.loading.connectedToPlayersCollection,
    connectedToGameDoc: state.loading.connectedToGameDoc,
})

const mapDispatchToProps = dispatch => ({
    updateGameData: data => dispatch(updateGameData(data)),
    updatePlayersData: data => dispatch(updatePlayersData(data)),
    setGameDisconnect: gameDisconnect => dispatch(setGameDisconnect(gameDisconnect)),
    setPlayersDisconnect: playersDisconnect => dispatch(setPlayersDisconnect(playersDisconnect)),
    setLoading: loading => dispatch(setLoading(loading)),
    setConnectedToPlayerCollection : () => { dispatch(connectedToPlayerCollection())},
    setConnectedToGameDoc : () => { dispatch(connectedToGameDoc())},
})

export default connect(mapStateToProps, mapDispatchToProps)(PreGame);