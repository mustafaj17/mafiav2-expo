import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import firebase from '../../services/firebase';

export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null, loading: false }
  handleLogin = () => {

    this.setState({loading: true})

    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ loading: false, errorMessage: error.message }))
  }
  render() {

    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.state.errorMessage}
        </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})


