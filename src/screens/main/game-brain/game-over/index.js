import React from 'react'
import {View, Text, Button,} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import {getCurrentPlayer} from "../../../../redux/selectors/index";

class GameOver extends React.Component {

    render() {
        return (
           <View style={styles.page}>
               <Text>Game Over</Text>
           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameData: state.game.gameData,
    gameDoc: state.game.gameDoc,
    currentPlayer: getCurrentPlayer(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);