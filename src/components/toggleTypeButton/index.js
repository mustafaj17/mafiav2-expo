import React from 'react';
import {
  toggleDisplayPlayerTypes,
  setUserHasSeenType, setUserClickedToggleBtn,
} from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import { Animated, TouchableOpacity, View } from 'react-native';
import Text from '../text';
import { AnimateShake } from '../animation/animateShake';

class ToggleTypeButton extends React.Component {
  handleTypeClick = () => {
    const {
      toggleDisplayPlayerTypes,
      setUserClickedToggleBtn,
      userClickedToggleBtn
    } = this.props;
    if (!userClickedToggleBtn) {
      setUserClickedToggleBtn()
    }
    toggleDisplayPlayerTypes();
  };

  render() {

    const { showPlayerTypes, userClickedToggleBtn } = this.props;
    return (
      <AnimateShake isShaking={!userClickedToggleBtn}>
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
          padding: 10,
          margin: 5,
        }}>
        <Text size="small" color="white">
          {showPlayerTypes ? 'HIDE' : 'SHOW'}
        </Text>
        <Text size="small" color="white">
          TEAM
        </Text>
      </TouchableOpacity>
      </AnimateShake>
    );
  }
}

const mapStateToProps = state => ({
  showPlayerTypes: state.game.showPlayerTypes,
  userClickedToggleBtn: state.game.userClickedToggleBtn,
});

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes()),
  userSeenType: () => dispatch(setUserHasSeenType()),
  setUserClickedToggleBtn: () => dispatch(setUserClickedToggleBtn())
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleTypeButton);
