import React from 'react'
import {connect} from "react-redux";
import Button from '../button';
import Text from '../text';

const playerReadyButton = (props) => {

    const setPlayerReady = () => {
        const { gameDoc , playerEmail } = props;
        gameDoc.ref.collection('players').doc(playerEmail).update({
            ready: true
        })
    }

    return(
      <Button onPress={setPlayerReady}>
        <Text color='black'>Ready</Text>
      </Button>
    )
}

const mapStateToProps = state => ({
    gameName: state.game.gameData.gameName,
    playerEmail: state.user.email,
    gameDoc: state.game.gameDoc
})

export default connect(mapStateToProps)(playerReadyButton)
