import React from 'react';
import {
  toggleDisplayPlayerTypes,
  userHasSeenType,
} from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import { Animated, TouchableOpacity, View } from 'react-native';
import Text from '../text';

class ToggleTypeButton extends React.Component {
  handleTypeClick = () => {
    const {
      userHasSeenType,
      toggleDisplayPlayerTypes,
      userSeenType,
    } = this.props;
    if (!userHasSeenType) {
      userSeenType();
    }
    toggleDisplayPlayerTypes();
  };

  render() {
    const { showPlayerTypes } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleTypeClick}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 120,
          zIndex: 999,
          borderColor: '#31d08a',
          borderWidth: 1,
          borderTopWidth: showPlayerTypes ? 5 : 1,
        }}>
        <Text size="small" color="white">
          {showPlayerTypes ? 'HIDE' : 'SHOW'}
        </Text>
        <Text size="small" color="white">
          TYPE
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  showPlayerTypes: state.game.showPlayerTypes,
  userHasSeenType: state.game.userHasSeenType,
});

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes()),
  userSeenType: () => dispatch(userHasSeenType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleTypeButton);
