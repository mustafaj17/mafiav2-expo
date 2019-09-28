import React from 'react'
import {KeyboardAvoidingView, ScrollView, View} from 'react-native'
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
import { sortGameStats, generateStatsObj, getVotesAgainstPlayer } from './utils';
import ProfilePicture from "../../../components/profilePicture";
import PageTitle from '../../../components/pageTitle';

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
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 100}}>
        <ProfilePicture imageUri={player.photoURL} size={50}/>
        <Text>{player.displayName}</Text>
      </View>
    ))
  }

  getVotesStats = () => {
    const { allPlayers } = this.props;
    const sortedResults = sortGameStats(allPlayers);
    return generateStatsObj(allPlayers, sortedResults)
  };

  getVotesAgainst = () => {
    const { allPlayers, currentPlayer } = this.props;
    return getVotesAgainstPlayer(allPlayers, currentPlayer).map(player => <Text>{player[0]}: {player[1]}</Text>)
  }


  render() {

    const { mafiasWon, currentPlayer } = this.props;
    const stats = this.getVotesStats();

    return (
      <View style={styles.page}>
        <PageTitle title='Game Over'/>
        <Text>
          {mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}
        </Text>

        <>
          <Text size='small' type='bold'>The Mafias</Text>
          <ScrollView
            style={{backgroundColor: 'black', padding: 10, width: '100%', flex: 0.2}}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {this.getMafias()}
          </ScrollView>

          <ScrollView style={{width: '100%'}}>
            <View style={{margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text type='bold'>Stats</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{marginBottom: 10}}>
                <Text size='small' type='bold'>Most voted: </Text>
                {stats.mostVoted.map(arr => <Text>{arr[0]}, {arr[1]} votes</Text>)}
              </View>

              <View style={{marginBottom: 10}}>
                <Text size='small' type='bold'>Least voted: </Text>
                {stats.leastVoted.map(arr => <Text>{arr[0]}, {arr[1]} votes</Text>)}
              </View>
            </View>
            <View style={{marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text size='small' type='bold'>Most votes against you</Text>
              {this.getVotesAgainst()}
            </View>

          </ScrollView>
        </>

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
