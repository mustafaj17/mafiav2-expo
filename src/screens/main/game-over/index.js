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

class GameOver extends React.Component {

  handleEndGame = () => {
    const { navigation, game } = this.props;
    game.playersDisconnect();
    game.gameDisconnect();
    this.props.endGame();
    navigation.navigate('Lobby')
  }

  handlePlayAgain= () => {}

  getResults = () => {
    const { allPlayers } = this.props;

    return allPlayers.sort(player =>player.type !== TYPE.MAFIA).map(player => (
      <Player key={player.uid} player={player} endGame/>
    ))
  }

  render() {

    const { mafiasWon, currentPlayer } = this.props;

    return (
      <View style={styles.page}>
        <Text>Game Over</Text>
        <Text>
          {mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}
        </Text>

        <>
          <ScrollView style={{ width: '100%', flex: 1 }}>
            {this.getResults()}
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
