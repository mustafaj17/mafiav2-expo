import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import {
  didMafiasWin,
  getCurrentPlayer,
} from '../../../redux/selectors';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Text from '../../../components/text';
import Button from '../../../components/button';
import { endGame } from '../../../redux/actions/gameActions';
import { setUserStats } from '../../../redux/actions/userActions';
import { COLLECTIONS, TYPE } from '../../../constants';
import { getAllPlayers } from '../../../redux/selectors';
import {
  sortGameStats,
  generateStatsObj,
  getVotesAgainstPlayer,
} from './utils';
import StatBox from '../../../components/statBox';
import { firestore } from '../../../services/firebase';
import ProfilePicture from '../../../components/profilePicture';
import civIcon from '../../../../assets/civilian-icon.png';
import mafiaIcon from '../../../../assets/mafia-icon.png';
import MafiaBackground from '../../../components/mafiaBackground';
import { LinearGradient } from 'expo-linear-gradient';
import FooterActionBar from '../../../components/footerActionBar/footerActionBar';

class GameOver extends React.Component {
  handleEndGame = () => {
    const { navigation, endGame } = this.props;
    endGame();
    navigation.navigate('Lobby');
  };

  componentWillMount = () => {
    const { game } = this.props;
    game.playersDisconnect();
    game.gameDisconnect();
    this.updateUserStats();
    this.updateGameDoc();
  };

  updateGameDoc = async () => {

    const { gameDoc, allPlayers, currentPlayer } = this.props;

    if(currentPlayer.isAdmin) {
      await gameDoc.ref.update({
        gameComplete: new Date(),
        playerCount: allPlayers.length
      })
    }
  }

  updateUserStats = async () => {
    const { mafiasWon, currentPlayer, stats, setUserStats } = this.props;

    const userWonAsMafia = mafiasWon && currentPlayer.type === TYPE.MAFIA;
    const userWonAsCivilian =
      !mafiasWon && currentPlayer.type === TYPE.CIVILIAN;
    const userWon = userWonAsMafia || userWonAsCivilian;
    const newStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      gamesWon: userWon ? stats.gamesWon + 1 : stats.gamesWon,
      gamesWonAsMafia: userWonAsMafia
        ? stats.gamesWonAsMafia + 1
        : stats.gamesWonAsMafia,
      lastPlayed: new Date(),
    }

    await firestore
      .collection(COLLECTIONS.STATS)
      .doc(currentPlayer.email)
      .update(newStats);

    setUserStats(stats);
  };

  handlePlayAgain = () => {};

  getMafias = () => {
    const { allPlayers } = this.props;

    return allPlayers
      .filter(player => player.type === TYPE.MAFIA)
      .map(player => (
        <View
          key={player.uid}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <ProfilePicture imageUri={player.photoURL} size={45} />
          <Text type="light" style={{ marginLeft: 10 }}>
            {player.displayName}
          </Text>
        </View>
      ));
  };

  getCivilians = () => {
    const { allPlayers } = this.props;

    return allPlayers
      .filter(player => player.type === TYPE.CIVILIAN)
      .map(player => (
        <View
          key={player.uid}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <ProfilePicture imageUri={player.photoURL} size={45} />
          <Text type="light" style={{ marginLeft: 10 }}>
            {player.displayName}
          </Text>
        </View>
      ));
  };

  getVotesStats = () => {
    const { allPlayers } = this.props;
    const sortedResults = sortGameStats(allPlayers);
    return generateStatsObj(allPlayers, sortedResults);
  };

  getVotesAgainst = () => {
    const { allPlayers, currentPlayer } = this.props;
    return (
      <StatBox
        title="VOTED FOR YOU"
        players={getVotesAgainstPlayer(allPlayers, currentPlayer)}
        key={currentPlayer.uid}
      />
    );
  };

  render() {
    const { mafiasWon } = this.props;
    const stats = this.getVotesStats();

    return (
      <MafiaBackground>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ScrollView style={{ width: '100%', flex: 1 }}>
            <LinearGradient
              start={{ x: 0, y: -0.5 }}
              end={{ x: 0, y: 1 }}
              colors={mafiasWon ? ['#811C24', '#DB1C24'] : ['#0000FF', '#000054']}
              style={{
                flex: 1,
                width: '100%',
                paddingTop: 10,
                paddingBottom: 10,
                display: 'flex',
                minHeight: 160,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <Image
                source={mafiasWon ? mafiaIcon : civIcon}
                resizeMode="contain"
                style={{
                  height: 150,
                  width: 150,
                  position: 'absolute',
                  opacity: 0.5,
                  bottom: 0,
                  right: 10,
                }}
              />
              <Text type="bold" style={{ marginBottom: 10 }}>
                WINNERS
              </Text>
              <View style={{ minWidth: 200 }}>
                {mafiasWon ? this.getMafias() : this.getCivilians()}
              </View>
            </LinearGradient>

            <LinearGradient
              start={{ x: 0, y: -0.5 }}
              end={{ x: 0, y: 1 }}
              colors={mafiasWon ? ['#0000FF', '#000054'] : ['#811C24', '#DB1C24']}
              style={{
                flex: 1,
                width: '100%',
                paddingTop: 10,
                minHeight: 160,
                paddingBottom: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <Image
                source={mafiasWon ? civIcon : mafiaIcon}
                resizeMode="contain"
                style={{
                  height: 150,
                  width: 150,
                  position: 'absolute',
                  opacity: 0.5,
                  bottom: 0,
                  right: 10,
                }}
              />
              <Text type="bold" style={{ marginBottom: 10 }}>
                LOSERS
              </Text>
              <View style={{ minWidth: 200 }}>
                {mafiasWon ? this.getCivilians() : this.getMafias()}
              </View>
            </LinearGradient>

            <View>
              { stats && <StatBox title="MOST VOTED" players={stats.mostVoted} />}
              {stats && <StatBox title="LEAST VOTED" players={stats.leastVoted} />}
              {this.getVotesAgainst()}
            </View>


          </ScrollView>

          <FooterActionBar>
            <Button onPress={this.handleEndGame}>
              <Text>End Game</Text>
            </Button>
          </FooterActionBar>
        </View>
      </MafiaBackground>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  gameData: state.game.gameData,
  gameDoc: state.game.gameDoc,
  currentPlayer: getCurrentPlayer(state),
  allPlayers: getAllPlayers(state),
  mafiasWon: didMafiasWin(state),
  stats: state.user.stats,
});

const mapDispatchToProps = dispatch => ({
  endGame: () => dispatch(endGame()),
  setUserStats: stats => dispatch(setUserStats(stats)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(GameOver, true));
