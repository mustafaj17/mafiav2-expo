import React from 'react'
import { KeyboardAvoidingView, Text, Button, BackHandler, ToastAndroid } from 'react-native';
import firebase from '../../services/firebase';
import { NavigationEvents } from "react-navigation";
import { FloatingLabelInput } from '../../components/floatingLabelInput/floatingLabelInput';
import { LoadingScreen } from '../../components/loadingScreen/loadingScreen';
import globalStyles from '../../styles/global';

export default class Login extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null,
    loading: false
  }

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


  handleLogin = async () => {

    this.setState({loading: true})
    const { email, password } = this.state;

    try{
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('Main')
    } catch(error){
      this.setState({ loading: false, errorMessage: error.message })
    }

  }

  render() {

    if(this.state.loading) return( <LoadingScreen/>);

    return (
      <KeyboardAvoidingView style={globalStyles.page}>

        <NavigationEvents
          onWillFocus={this.screenWillFocus}
          onWillBlur={this.screenWillBlur}
        />

        <Text>Login</Text>
        {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
        </Text>}

        <FloatingLabelInput
          label="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <FloatingLabelInput
          secureTextEntry
          label="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </KeyboardAvoidingView>
    )
  }
}

// const styles = StyleSheet.create({
//   textInput: {
//     marginTop: 8
//   }
// })


