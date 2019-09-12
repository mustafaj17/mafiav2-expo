import React from "react";
import {BackHandler, ToastAndroid} from "react-native";


const  DisabledBack = (WrappedComponent) => {
  return class extends React.Component {
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

    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}

export default DisabledBack;