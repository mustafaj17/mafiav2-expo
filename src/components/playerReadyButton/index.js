import React from 'react';
import { connect } from 'react-redux';
import Text from '../text';
import { getCurrentPlayer } from '../../redux/selectors';
import { TouchableOpacity, View, Animated } from 'react-native';
import { COLLECTIONS } from '../../constants';

class playerReadyButton extends React.Component {
  setPlayerReady = () => {
    const { gameDoc, currentPlayer } = this.props;

    if (currentPlayer.ready) return;

    gameDoc.ref
      .collection(COLLECTIONS.PLAYERS)
      .doc(currentPlayer.email)
      .update({
        ready: true,
      });
  };

  render() {
    const { currentPlayer } = this.props;
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00EB0A',
          flex: 1,
          marginRight: 10,
        }}
        onPress={this.setPlayerReady}>
        <Text color="black">
          {' '}
          {currentPlayer.ready ? 'WAITING...' : 'READY'}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  gameName: state.game.gameData.gameName,
  gameDoc: state.game.gameDoc,
  currentPlayer: getCurrentPlayer(state),
});

export default connect(mapStateToProps)(playerReadyButton);
