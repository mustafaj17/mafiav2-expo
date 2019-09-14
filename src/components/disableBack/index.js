import React from "react";
import {BackHandler, ToastAndroid, View, Modal, Button, Text, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';


const  DisabledBack = (WrappedComponent) => {
  return class extends React.Component {

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

    handlePlayerLeaving = () => {

    }

    render() {
      return (
        <View style={{ flex: 1}}>
          <TouchableOpacity onPress={this.showModal} style={{ position: 'absolute' , top: 30, right: 20, zIndex: 10}}>
            <Ionicons name="md-close" size={32} color="black" />
          </TouchableOpacity>

          {/*<Button title='Leave game' />*/}
          {this.state.showModal &&
          <Modal onRequestClose={this.hideModal} animationType='fade'>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text>Are you sure you want to leave?</Text>
              <Button title='yes' onPress={this.handlePlayerLeaving}/>
              <Button title='no' onPress={this.hideModal}/>
            </View>
          </Modal>}
          <WrappedComponent {...this.props} />
        </View>
      )
    }
  }
}

export default DisabledBack;
