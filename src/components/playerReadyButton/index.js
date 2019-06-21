import React from 'react'
import styles from "../../styles/global";
import {Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";

const playerReadyButton = (props) => {

    const setPlayerReady = () => {
        const { gameDoc , playerEmail } = props;
        gameDoc.ref.collection('players').doc(playerEmail).update({
            ready: true
        })
    }

    return(
       <TouchableOpacity onPress={setPlayerReady}>
           <View style={styles.button} >
               <Text>Ready</Text>
           </View>
       </TouchableOpacity>
    )
}

const mapStateToProps = state => ({
    gameName: state.game.gameData.gameName,
    playerEmail: state.user.data.email,
    gameDoc: state.game.gameDoc
})

export default connect(mapStateToProps)(playerReadyButton)