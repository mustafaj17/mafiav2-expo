import React from 'react'
import {View, Text, Button,} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import {didMafiasWin, getCurrentPlayer} from "../../../../redux/selectors/index";

class GameOver extends React.Component {

    handleEndGame = () => {}
    handlePlayAgain= () => {}

    render() {

        const { mafiasWon } = this.props;

        return (
           <View style={styles.page}>
               <Text>Game Over</Text>
               <Text>
                   {mafiasWon ? 'MAFIAS WON' : 'CIVILIANS WON'}
               </Text>

               <Button title='Play again' onPress={this.handlePlayAgain}/>
               <Button title='End game' onPress={this.handleEndGame}/>

           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameData: state.game.gameData,
    gameDoc: state.game.gameDoc,
    currentPlayer: getCurrentPlayer(state),
    mafiasWon: didMafiasWin(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);