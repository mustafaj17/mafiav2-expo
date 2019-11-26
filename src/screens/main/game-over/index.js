import React from 'react'
import {ScrollView, View} from 'react-native'
import { connect } from 'react-redux';
import {didMafiasWin, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import { endGame } from '../../../redux/actions/gameActions';
import { COLLECTIONS, TYPE } from '../../../constants';
import {getAllPlayers} from "../../../redux/selectors";
import { sortGameStats, generateStatsObj, getVotesAgainstPlayer } from './utils';
import PageTitle from '../../../components/pageTitle';
import StatBox from "../../../components/statBox";
import { firestore } from '../../../services/firebase';
import Player from "../../../components/player/Player";
import MafiaLogo from "../../../components/mafiaLogo";
import ProfilePicture from '../../../components/profilePicture';

class GameOver extends React.Component {

  handleEndGame = () => {
    const { navigation, game } = this.props;
    game.playersDisconnect();
    game.gameDisconnect();
    this.props.endGame();
    navigation.navigate('Lobby')
  }

  componentWillMount = () => {
    this.updateUserStats()
  }

  updateUserStats = async () => {

    const { mafiasWon, currentPlayer, stats } = this.props;

    const userWonAsMafia = mafiasWon && (currentPlayer.type === TYPE.MAFIA);
    const userWonAsCivilian = !mafiasWon && (currentPlayer.type === TYPE.CIVILIAN);
    const userWon = userWonAsMafia || userWonAsCivilian;


    await firestore.collection(COLLECTIONS.STATS).doc(currentPlayer.email).update({
      ...stats,
      gamesPlayed : stats.gamesPlayed + 1,
      gamesWon: userWon ? stats.gamesWon + 1 : stats.gamesWon,
      gamesWonAsMafia : userWonAsMafia ? stats.gamesWonAsMafia + 1 : stats.gamesWonAsMafia
    });

  }

  handlePlayAgain= () => {}

  getMafias = () => {
    const { allPlayers } = this.props;

    return allPlayers.filter(player =>player.type === TYPE.MAFIA).map(player => (
      <View style={{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 5
      }}>
        <ProfilePicture imageUri={player.photoURL} size={40}/>
        <Text
          type='light'
          style={{marginLeft: 15}}
        >
          {player.displayName}
        </Text>
      </View>
      // <Player player={player}/>
    ))
  }

  getVotesStats = () => {
    const { allPlayers } = this.props;
    const sortedResults = sortGameStats(allPlayers);
    return generateStatsObj(allPlayers, sortedResults)
  };

  getVotesAgainst = () => {
    const { allPlayers, currentPlayer } = this.props;
    return getVotesAgainstPlayer(allPlayers, currentPlayer).map(
      player =>
        <StatBox title='Your hater' name={player[0]} number={player[1]} />
    )
  }


  render() {

    const { mafiasWon } = this.props;
    const stats = this.getVotesStats();

    return (
      <ScrollView style={{width: '100%', flex: 1, padding: 5}}>
        <PageTitle title={mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}/>

        <MafiaLogo/>

        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey', marginBottom: 10}}>
          <Text>
            The Mafias
          </Text>
        </View>

        {this.getMafias()}

        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey', marginBottom: 10, marginTop: 20}}>
          <Text>
            Stats
          </Text>
        </View>

        <View >
          {stats.mostVoted.map(arr => <StatBox title='Most voted' name={arr[0]} number={arr[1]} />)}
          {stats.leastVoted.map(arr => <StatBox title='Least voted' name={arr[0]} number={arr[1]} />)}
          {this.getVotesAgainst()}
        </View>

        <View style={{display: 'flex', flexDirection: 'row', width: '100%', padding: 10, justifyContent: 'space-between'}}>
          <Button onPress={()=> console.log('handlePlayAgain')} style={{width: '100%', margin: 5}}>
            <Text>Play Again</Text>
          </Button>

          <Button onPress={this.handleEndGame} style={{width: '100%', margin: 5}}>
            <Text>End Game</Text>
          </Button>
        </View>

      </ScrollView>

    )
  }
}


const mapStateToProps = state => ({
  game: state.game,
  gameData: state.game.gameData,
  gameDoc: state.game.gameDoc,
  currentPlayer: getCurrentPlayer(state),
  inGamePlayers: getInGamePlayers(state),
  allPlayers: getAllPlayers(state),
  mafiasWon: didMafiasWin(state),
  stats: state.user.stats
})

const mapDispatchToProps = dispatch => ({
  endGame : () => dispatch(endGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(GameOver, true));
