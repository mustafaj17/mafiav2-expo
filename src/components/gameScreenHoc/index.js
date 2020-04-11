import React from 'react';
import {
  BackHandler,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MafiaBackground from '../mafiaBackground';
import PlayerInfoModal from '../playerInfoModal';
import LeaveGameModal from '../leaveGameModal';
import { YesNoModal } from '../YesNoModal';

export default (WrappedComponent, hideCloseButton) => {
  class HOC extends React.Component {
    state = {
      showModal: false,
    };

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
    }

    handleBackButton = () => {
      return true;
    };

    showModal = () => {
      this.setState({
        showModal: true,
      });
    };

    closeModal = () => {
      this.setState({
        showModal: false,
      });
    };

    render() {
      return (
        <View style={{ flex: 1 }}>
          {!hideCloseButton && (
            <TouchableOpacity
              onPress={this.showModal}
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
              <Ionicons name="md-close" size={32} color="white" />
            </TouchableOpacity>
          )}



          <LeaveGameModal
            visible={this.state.showModal}
            hideModal={this.closeModal}/>


          <MafiaBackground>
            <WrappedComponent {...this.props} />
          </MafiaBackground>

          <PlayerInfoModal />
        </View>
      );
    }
  }

  return HOC;
};
