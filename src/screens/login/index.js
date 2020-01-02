import React from 'react'
import { KeyboardAvoidingView, View } from 'react-native';
import firebase from '../../services/firebase';
import { FloatingLabelInput } from '../../components/floatingLabelInput/floatingLabelInput';
import LoadingScreen from '../../components/loadingScreen';
import globalStyles from '../../styles/global';
import MafiaBackground from '../../components/mafiaBackground';
import Button from '../../components/button';
import Text from '../../components/text';
import MafiaLogo from '../../components/mafiaLogo';
import AnimateLogo from '../../components/amimatedLogo';
import ErrorMessage from '../../components/errorMessage';

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
      <MafiaBackground>
        <KeyboardAvoidingView style={globalStyles.page}>



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

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
          {this.state.errorMessage && <ErrorMessage errorMessage={this.state.errorMessage}/> }
          </View>

          <View style={{display: 'flex', flexDirection: 'row', width: '100%', padding: 10, justifyContent: 'space-around'}}>

            <Button onPress={this.handleLogin} style={{margin: 5, width: 'auto'}}>
              <Text>Login</Text>
            </Button>



          </View>
        </KeyboardAvoidingView>
      </MafiaBackground>
    )
  }
}

// const styles = StyleSheet.create({
//   textInput: {
//     marginTop: 8
//   }
// })


