import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../services/firebase';
import {
  getCurrentPlayer,
  getInGamePlayers,
} from '../../../redux/selectors';
import { COLLECTIONS, TYPE } from '../../../constants';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Player from '../../../components/player/Player';
import Text from '../../../components/text';
import Button from '../../../components/button';
import PageTitle from '../../../components/pageTitle';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from '../../../components/loadingScreen';
import FooterActionBar from '../../../components/footerActionBar/footerActionBar';
import ConfigureGameModal from '../../../components/configureGameModal';

class PreGame extends React.Component {

  state = {
    showConfigureGameModal: false,
  }

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
  //   batch.update(gameDoc.ref, { gameStarted: false });
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

  getDefaultMafiaCount = () => {
    const { playerCount } = this.props

    //MAFIA algorithm
    return (Math.ceil(playerCount  / 2 ) ) -1
  }

  setPlayerTypes = () => {
    let mafiaCount = this.props.mafiaCount || this.getDefaultMafiaCount()
    const players = [...this.props.inGamePlayers];

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

    const { gameDoc, inGamePlayers  } = this.props;

    //they need 3 players to start a game
    if(inGamePlayers.length < 3) {
      return;
    }

    const { customRoundTime } = this.state;

    const players = this.setPlayerTypes();

    players.forEach(player => {
      if (!player.type) {
        player.type = TYPE.CIVILIAN;
      }
    });

    const batch = firestore.batch();
    batch.update(gameDoc.ref, { gameStarted: true, roundTime: customRoundTime || 60 });
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

  showConfigureGameModal = () => {
    this.setState({showConfigureGameModal: true})
  }

  render() {
    const { gameData, currentPlayer, inGamePlayers } = this.props;

    if (!currentPlayer || !gameData) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.page}>
        <PageTitle title={gameData.gameName} />

        <ScrollView style={{ width: '100%', flex: 1 }}>
          {inGamePlayers.map(player => (
            <Player key={player.uid} player={player} />
          ))}
          <View style={{ height: 100 }}/>
        </ScrollView>

        <ConfigureGameModal
          visible={this.state.showConfigureGameModal}
          closeModal={() => this.setState({showConfigureGameModal: false})}
        />

        {currentPlayer.isAdmin &&
        <FooterActionBar>
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            flex: 1
          }}>
          <Button onPress={this.handleStartGame}
                  width='auto'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#00EB0A',
                    padding: 10,
                    margin: 5,
                    flexGrow: 2,
                    flex: 1
                  }}>
            <Text size='small' color='black'>{ inGamePlayers.length > 2 ? 'Start Game' : '3 players needed...'}</Text>
          </Button>

          <Button onPress={this.showConfigureGameModal}
                  // TODO: uncomment below
                  // disabled={inGamePlayers.length < 3}
                  width='auto'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow: 1,
                    borderColor: '#31d08a',
                    padding: 10,
                    margin: 5,
                    flex: 1
                  }}>
            <Ionicons name="md-settings" size={22} color="#00EB0A" />
            <Text size='small' style={{paddingLeft: 5}}>Custom</Text>
          </Button>
          </View>
        </FooterActionBar>
        }

        { !currentPlayer.isAdmin &&
        <Text style={{ marginBottom: 20 }} size='small'>Waiting for admin... </Text>
        }



        {/*<TouchableOpacity*/}
        {/*  onPress={this.startTestGame}*/}
        {/*  style={{*/}
        {/*    position: 'absolute',*/}
        {/*    bottom: 100,*/}
        {/*    left: 10,*/}
        {/*    width: 50,*/}
        {/*    height: 50,*/}
        {/*    borderRadius: 25,*/}
        {/*    backgroundColor: 'pink',*/}
        {/*    display: 'flex',*/}
        {/*    justifyContent: 'center',*/}
        {/*    alignItems: 'center',*/}
        {/*  }}>*/}
        {/*  <Text size="xxsmall">Test</Text>*/}
        {/*</TouchableOpacity>*/}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameDoc: state.game.gameDoc,
  gameData: state.game.gameData,
  playersData: state.game.playersData,
  mafiaCount: state.game.config.mafiaCount,
  inGamePlayers: getInGamePlayers(state),
  currentPlayer: getCurrentPlayer(state),
  playerCount: getInGamePlayers(state).length,
  playerRequirementMet: state.game.playersData.length > 0,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(PreGame));




