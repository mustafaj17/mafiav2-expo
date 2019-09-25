import React from 'react'
import {View} from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {didMafiasWin, getCurrentPlayer} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import { endGame } from '../../../redux/actions/gameActions';

class GameOver extends React.Component {

  handleEndGame = () => {
      const { navigation, game } = this.props;
      game.playersDisconnect();
      game.gameDisconnect();
      this.props.endGame();
      navigation.navigate('Lobby')
    }
    handlePlayAgain= () => {}

    render() {

        const { mafiasWon } = this.props;

        return (
           <View style={styles.page}>
               <Text>Game Over</Text>
               <Text>
                   {mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}
               </Text>

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
    mafiasWon: didMafiasWin(state)
})

const mapDispatchToProps = dispatch => ({
  endGame : () => dispatch(endGame())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(GameOver, true));
