import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../services/firebase';
import {
  areAllPlayersReady,
  getCurrentPlayer,
  getInGamePlayers,
} from '../../../redux/selectors';
import { COLLECTIONS, TYPE } from '../../../constants';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Player from '../../../components/player/Player';
import Text from '../../../components/text';
import Button from '../../../components/button';
import PageTitle from '../../../components/pageTitle';
import TextBar from '../../../components/textBar';
import LoadingScreen from '../../../components/loadingScreen';

class PreGame extends React.Component {


  // startTestGame = () => {
  //   const { gameDoc, navigation, currentPlayer } = this.props;
  //
  //   const testPlayers = [
  //     {
  //       email: 'test1@email.com',
  //       type: TYPE.CIVILIAN,
  //       displayName: 'Amoori',
  //       ready: true,
  //       votedFor: [],
  //       uid: 1,
  //     },
  //     {
  //       email: 'test2@email.com',
  //       type: TYPE.CIVILIAN,
  //       displayName: 'Ali',
  //       ready: true,
  //       votedFor: [],
  //       uid: 2,
  //     },
  //     {
  //       email: 'test3@email.com',
  //       type: TYPE.CIVILIAN,
  //       displayName: 'Stunna Jay',
  //       ready: false,
  //       votedFor: [],
  //       uid: 3,
  //     },
  //     {
  //       email: 'test4@email.com',
  //       type: TYPE.CIVILIAN,
  //       displayName: 'Muk',
  //       ready: true,
  //       votedFor: [],
  //       uid: 4,
  //     },
  //     // {
  //     //     email: 'test5@email.com',
  //     //     type: TYPE.MAFIA,
  //     //     displayName: 'Big Jimmy Jones',
  //     //     ready: true,
  //     //     votedFor: [],
  //     //     uid: 5
  //     // },
  //     // {
  //     //     email: 'test6@email.com',
  //     //     type: TYPE.CIVILIAN,
  //     //     displayName: 'big civilian man',
  //     //     ready: true,
  //     //     votedFor: [],
  //     //     uid: 6
  //     // },
  //     // {
  //     //     email: 'test5@email.com',
  //     //     type: TYPE.CIVILIAN,
  //     //     displayName: 'civilian brudda',
  //     //     ready: true,
  //     //     votedFor: [],
  //     //     uid: 7
  //     // }
  //   ];
  //
  //   const batch = firestore.batch();
  //
  //   batch.update(gameDoc.ref, { gameStarted: true });
  //   testPlayers.forEach(player => {
  //     batch.set(gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(player.email), {
  //       ...player,
  //     });
  //   });
  //
  //   batch.update(
  //     gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(currentPlayer.email),
  //     { type: TYPE.MAFIA, votedFor: [] },
  //   );
  //
  //   batch
  //     .commit()
  //     .then(() => {
  //       console.log('game started and player types set');
  //       navigation.navigate('PreRound');
  //     })
  //     .catch(e => {
  //       console.log('error starting game and setting player types: ', e);
  //     });
  // };

  setPlayerTypes = () => {
    const players = [...this.props.playersData];
    let mafiaCount;

    switch (true) {
      case players.length < 5:
        mafiaCount = 1;
        break;
      case players.length < 8:
        mafiaCount = 2;
        break;
      case players.length < 11:
        mafiaCount = 3;
        break;
      case players.length < 14:
        mafiaCount = 4;
        break;
      case players.length < 16:
        mafiaCount = 5;
        break;
      default:
        mafiaCount = 6;
        break;
    }

    while (mafiaCount) {
      let rand = Math.floor(Math.random() * players.length);
      if (!players[rand].type) {
        players[rand].type = TYPE.MAFIA;
        mafiaCount--;
      }
    }

    return players;
  };

  handleStartGame = () => {
    const { gameDoc } = this.props;

    const players = this.setPlayerTypes();

    players.forEach(player => {
      if (!player.type) {
        player.type = TYPE.CIVILIAN;
      }
    });

    const batch = firestore.batch();
    batch.update(gameDoc.ref, { gameStarted: true });
    players.forEach(player => {
      batch.update(
        gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(player.email),
        { type: player.type, votedFor: [] },
      );
    });

    batch
      .commit()
      .then(() => {
        console.log('game started and player types set');
      })
      .catch(e => {
        console.log('error starting game and setting player types: ', e);
      });
  };

  shouldComponentUpdate(nextProps) {
    const { navigation, gameData } = nextProps;

    if (gameData && gameData.gameStarted) {
      navigation.navigate('PreRound');
      return false;
    }

    return true;
  }


  render() {
    const { gameData, currentPlayer, inGamePlayers } = this.props;

    if (!currentPlayer || !gameData) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.page}>
        <PageTitle title={gameData.gameName} />

        <ScrollView style={{ width: '100%' }}>
          {inGamePlayers.map(player => (
            <Player key={player.uid} player={player} />
          ))}
          <View style={{ height: 100 }}></View>
        </ScrollView>

        {currentPlayer.isAdmin ?
          (inGamePlayers.length > 2 ? (
            <Button onPress={this.handleStartGame}>
              <Text>Start Game</Text>
            </Button>
          ) : (
            <Text style={{ marginBottom: 20 }}>3 players needed... </Text>
          )) :
          <Text style={{ marginBottom: 20 }}>Waiting for admin... </Text>
        }

        {/*<TouchableOpacity*/}
          {/*onPress={this.startTestGame}*/}
          {/*style={{*/}
            {/*position: 'absolute',*/}
            {/*bottom: 100,*/}
            {/*left: 10,*/}
            {/*width: 50,*/}
            {/*height: 50,*/}
            {/*borderRadius: 25,*/}
            {/*backgroundColor: 'pink',*/}
            {/*display: 'flex',*/}
            {/*justifyContent: 'center',*/}
            {/*alignItems: 'center',*/}
          {/*}}>*/}
          {/*<Text size="xxsmall">Test</Text>*/}
        {/*</TouchableOpacity>*/}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameDoc: state.game.gameDoc,
  gameData: state.game.gameData,
  playersData: state.game.playersData,
  inGamePlayers: getInGamePlayers(state),
  currentPlayer: getCurrentPlayer(state),
  playerRequirementMet: state.game.playersData.length > 0,
  allPlayersAreReady: areAllPlayersReady(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(PreGame));




