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
import { sortGameStats, generateStatsObj, getVotesAgainstPlayer } from './utils';
import ProfilePicture from "../../../components/profilePicture";
import PageTitle from '../../../components/pageTitle';
import StatBox from "../../../components/statBox";

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
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        minWidth: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        padding: 10,
        marginRight: 10
      }}>
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
    return getVotesAgainstPlayer(allPlayers, currentPlayer).map(player => <StatBox title='Your hater' name={player[0]} number={player[1]} />)
  }

  render() {

    const { mafiasWon, currentPlayer } = this.props;
    const stats = this.getVotesStats();

    return (
      <View style={{ display: 'flex',
        width: '100%',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <PageTitle title={mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}/>


          <View style={{width: '100%'}}>
            <View style={{margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text type='bold'>The Mafias</Text>
            </View>
            <ScrollView
              style={{ padding: 10, width: '100%'}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {this.getMafias()}
            </ScrollView>
          </View>

          <View style={{width: '100%'}}>
            <View style={{margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text type='bold'>Stats</Text>
            </View>

            <ScrollView
              style={{ padding: 10, width: '100%'}}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {stats.mostVoted.map(arr => <StatBox title='Most voted' name={arr[0]} number={arr[1]} />)}
              {stats.leastVoted.map(arr => <StatBox title='Least voted' name={arr[0]} number={arr[1]} />)}
              {this.getVotesAgainst()}
            </ScrollView>
          </View>


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
