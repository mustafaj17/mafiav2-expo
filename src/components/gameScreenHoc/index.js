import React from "react";
import {BackHandler, ToastAndroid, View, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MafiaBackground from '../mafiaBackground';
import PlayerInfoModal from '../playerInfoModal';
import LeaveGameModal from '../leaveGameModal';


export default (WrappedComponent, hideCloseButton) => {
  class HOC extends React.Component {

    state = {
      showModal: false
    }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
      ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
      return true;
    }

    showModal = () => {
      this.setState( {
        showModal: true
      })
    }

    hideModal = () => {
      this.setState( {
        showModal: false
      })
    }

    render() {
      return (
        <View style={{ flex: 1}}>

          {!hideCloseButton &&
          <TouchableOpacity onPress={this.showModal} style={{ position: 'absolute' , top: 5, right: 10, zIndex: 2}}>
            <Ionicons name="md-close" size={32} color="black" />
          </TouchableOpacity>}

          {this.state.showModal && <LeaveGameModal hideModal={this.hideModal}/>}

          <MafiaBackground>
            <WrappedComponent {...this.props} />
          </MafiaBackground>

          <PlayerInfoModal/>

        </View>
      )
    }
  }

  return HOC;

}

