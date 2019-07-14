import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import firebase from '../../services/firebase';

export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null, displayName: '', loading: false }
    handleSignUp = () => {
      this.setState({loading: true})
        const { email, password, displayName} = this.state

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                userCredentials.user.updateProfile({displayName: displayName})
                this.props.navigation.navigate('Main')
            })
            .catch(error => this.setState({loading: false, errorMessage: error.message}))
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
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="Display Name"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={displayName => this.setState({ displayName })}
                    value={this.state.displayName}
                />
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
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
