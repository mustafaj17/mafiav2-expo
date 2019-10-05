import React from 'react'
import { ScrollView, View} from 'react-native'
import { connect } from 'react-redux';
import {didMafiasWin, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import { endGame } from '../../../redux/actions/gameActions';
import { TYPE } from '../../../constants';
import {getAllPlayers} from "../../../redux/selectors";
import { sortGameStats, generateStatsObj, getVotesAgainstPlayer } from './utils';
import PageTitle from '../../../components/pageTitle';
import StatBox from "../../../components/statBox";
import { firestore } from '../../../services/firebase';
import Player from "../../../components/player/Player";
import MafiaLogo from "../../../components/mafiaLogo";
import Overlay from "../../../components/overlay";
import StatsModal from "../../../components/statsModal";

class GameOver extends React.Component {

  state={
    modalVisible: false,
  }

  handleEndGame = () => {
    const { navigation, game } = this.props;
    this.updateUserStats()
    game.playersDisconnect();
    game.gameDisconnect();
    this.props.endGame();
    navigation.navigate('Lobby')
  }

  updateUserStats = async () => {

    const { mafiasWon, currentPlayer, stats } = this.props;

    const userWonAsMafia = mafiasWon && (currentPlayer.type === TYPE.MAFIA);
    const userWonAsCivilian = !mafiasWon && (currentPlayer.type === TYPE.CIVILIAN);
    const userWon = userWonAsMafia || userWonAsCivilian;


    await firestore.collection('user-stats').doc(currentPlayer.email).update({
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
      <Player player={player}/>
    ))
  }

  getVotesStats = () => {
    const { allPlayers } = this.props;
    const sortedResults = sortGameStats(allPlayers);
    return generateStatsObj(allPlayers, sortedResults)
  };

  getVotesAgainst = () => {
    const { allPlayers, currentPlayer } = this.props;
    return getVotesAgainstPlayer(allPlayers, currentPlayer).map(player => <StatBox title='Your hater' name={player[0]} number={player[1]} />)
  }

  toggleModal = () => this.setState({modalVisible: !this.state.modalVisible})

  render() {

    const { mafiasWon, currentPlayer } = this.props;
    const stats = this.getVotesStats();

    return (
      <View style={{ display: 'flex',
        width: '100%',
        flex: 1,
        alignItems: 'center',
      }}>
        <StatsModal visible={this.state.modalVisible} stats={stats} toggleModal={this.toggleModal} getVotesAgainst={this.getVotesAgainst}/>
        <PageTitle title={mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}/>
        <MafiaLogo/>

        <View style={{width: '100%'}}>
          <View style={{margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text type='bold'>The Mafias</Text>
          </View>
        </View>
        <ScrollView style={{width: '100%', flex: 1}}>
          {this.getMafias()}
        </ScrollView>

        <Button onPress={this.toggleModal} style={{width: 150}}>
          <Text color='black'>Stats</Text>
        </Button>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%', padding: 20, justifyContent: 'space-around'}}>

          { currentPlayer.isAdmin &&
          <Button onPress={()=> console.log('handlePlayAgain')} style={{width: 150}}>
            <Text color='black'>Play Again</Text>
          </Button>
          }
          <Button onPress={this.handleEndGame} style={{width: 150}}>
            <Text color='black'>End Game</Text>
          </Button>
        </View>
        {this.state.modalVisible &&
        <Overlay/>
        }
      </View>
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
