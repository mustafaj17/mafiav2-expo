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


