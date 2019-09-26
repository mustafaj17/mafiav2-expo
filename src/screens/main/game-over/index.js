import React from 'react'
import {ScrollView, View} from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {didMafiasWin, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import { endGame } from '../../../redux/actions/gameActions';
import { TYPE } from '../../../constants';
import {getAllPlayers} from "../../../redux/selectors";
import Player from'../../../components/player'
import { sortGameStats, generateStatsObj } from './utils';

class GameOver extends React.Component {

  handleEndGame = () => {
    const { navigation, game } = this.props;
    game.playersDisconnect();
    game.gameDisconnect();
    this.props.endGame();
    navigation.navigate('Lobby')
  }

  handlePlayAgain= () => {}

  getMafias = () => {
    const { allPlayers } = this.props;

    return allPlayers.filter(player =>player.type === TYPE.MAFIA).map(player => (
      <Player key={player.uid} player={player} showType={true}/>
    ))
  }

  getVotesStats = () => {
    const { allPlayers } = this.props;
    const sortedResults = sortGameStats(allPlayers);
    return generateStatsObj(allPlayers, sortedResults)
  };

  getVotesAgainst = () => {
    const { allPlayers, currentPlayer } = this.props;
    let voters = []

    allPlayers.forEach(player => {
      player.votedFor.forEach(vote => {
        if (vote === currentPlayer.displayName) voters.push(player.displayName)
      })
    })

    if (!voters.length) return <Text>No one voted you</Text>;
    return voters.map(name => <Text>{name}</Text>)
  }


  render() {

    const { mafiasWon, currentPlayer } = this.props;
    const stats = this.getVotesStats();

    return (
      <View style={styles.page}>
        <Text>Game Over</Text>
        <Text>
          {mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}
        </Text>

        <>
          <Text size='small' type='bold'>The Mafias</Text>
          <ScrollView style={{ width: '100%', flex: 1 }}>
            {this.getMafias()}
          </ScrollView>

          <ScrollView style={{width: '100%', flex: 1}}>
            <Text size='small' type='bold'>Stats</Text>

            <View style={{marginBottom: 10}}>
              <Text size='small' type='bold'>Most voted: </Text>
              {stats.mostVoted.map(arr => <Text>{arr[0]}, {arr[1]} votes</Text>)}
            </View>

            <View style={{marginBottom: 10}}>
              <Text size='small' type='bold'>Least voted: </Text>
              {stats.leastVoted.map(arr => <Text>{arr[0]}, {arr[1]} votes</Text>)}
            </View>

            <View style={{marginBottom: 10}}>
              <Text size='small' type='bold'>Votes against you</Text>
              {this.getVotesAgainst()}
            </View>

          </ScrollView>
          { currentPlayer.isAdmin &&
          <Button onPress={()=> console.log('handlePlayAgain')} >
            <Text color='black'>Play Again</Text>
          </Button>
          }
        </>

        {/*<Button title='Play again' onPress={this.handlePlayAgain}/>*/}
        <Button onPress={this.handleEndGame}>
          <Text color='black'>End game</Text>
        </Button>

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
  mafiasWon: didMafiasWin(state)
})

const mapDispatchToProps = dispatch => ({
  endGame : () => dispatch(endGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(GameOver, true));
