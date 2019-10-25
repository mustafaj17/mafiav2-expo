import React from 'react'
import { KeyboardAvoidingView, BackHandler, ToastAndroid } from 'react-native';
import globalStyles from '../../styles/global';
import {NavigationEvents} from "react-navigation";
import Button from '../../components/button';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../../components/text';
import MafiaLogo from '../../components/mafiaLogo';

export default class Landing extends React.Component {
  screenWillFocus = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  screenWillBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={globalStyles.page}>
        <NavigationEvents
          onWillFocus={this.screenWillFocus}
          onWillBlur={this.screenWillBlur}
        />

        <MafiaLogo/>

        <Button
          onPress={() => navigation.navigate('Login')}
        >
          <Text >Login</Text>
        </Button>

        <Button
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text >Sign Up</Text>
        </Button>

        <Button
          onPress={() => navigation.navigate('HowToPlay')}
        >
          <Text >How To Play</Text>
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

