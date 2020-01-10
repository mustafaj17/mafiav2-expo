import React from 'react';
import { TYPE } from '../../constants';
import { View, Image, TouchableOpacity } from 'react-native';
import { getCurrentPlayer } from '../../redux/selectors';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import mafiaIcon from '../../../assets/mafia-type-icon.png';
import civIcon from '../../../assets/civilian-type-icon.png';
import AnimatedType from '../animatedType';
import { setModalData } from '../../redux/actions/modalActions';
import Player from './Player';
import Text from '../text';

export class PlayerWithToggleType extends React.Component {
  openPlayerInfoModal = () => {
    const { setModalData, player } = this.props;
    setModalData(player);
  };

  getPlayerType = () => {
    const { player, currentPlayer } = this.props;
    const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
    const playerMatch = currentPlayer && currentPlayer.uid === player.uid;

    const playerType = (
      <View style={{ marginLeft: 'auto', marginRight: 10 }}>
        <AnimatedType>
          <Image
            source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
            resizeMode="contain"
            style={{ flex: 1, width: '100%' }}
          />
        </AnimatedType>
      </View>
    );

    if (currentPlayerIsCivilian) {
      if (playerMatch) {
        return playerType;
      }
      return null;
    }

    if (player.type !== TYPE.CIVILIAN) {
      return playerType;
    } else {
      return null;
    }
  };

  render = () => {
    const { player } = this.props;

    return (
      <TouchableOpacity onPress={this.openPlayerInfoModal}>
        <Player
          player={player}
          subText={player.ready ? 'ready' : 'not ready...'}
          greenSubText={player.ready}>
          {this.getPlayerType()}
        </Player>
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = state => {
  return {
    currentPlayer: getCurrentPlayer(state),
    showPlayerTypes: state.game.showPlayerTypes,
  };
};

const mapDispatchToProps = dispatch => ({
  setModalData: player => dispatch(setModalData(player)),
});

PlayerWithToggleType.defaultProps = {
  currentPlayer: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerWithToggleType);
