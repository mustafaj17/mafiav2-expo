import React from 'react'
import { KeyboardAvoidingView, Text, View, BackHandler, ToastAndroid, Button } from 'react-native';
import globalStyles from '../../styles/global';
import {NavigationEvents} from "react-navigation";

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
        <Text>Welcome to Mafia</Text>
        <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
          <View style={{margin: 10}}>
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
          <Button
            title="How To Play"
            onPress={() => navigation.navigate('HowToPlay')}
          />
      </KeyboardAvoidingView>
    )
  }
}

