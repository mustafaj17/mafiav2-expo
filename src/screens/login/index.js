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

          <MafiaLogo size={80}/>
          {/*<AnimateLogo/>*/}

          {this.state.errorMessage &&
          <Text style={{ color: 'pink' }}>
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




          <View style={{display: 'flex', flexDirection: 'row', width: '100%', padding: 10, justifyContent: 'space-around'}}>

            <Button
              style={{width: 120, backgroundColor: 'none', borderWidth: 1,borderColor: 'white', elevation: 0}}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <Text >Sign Up</Text>
            </Button>

            <Button onPress={this.handleLogin} style={{width: 120}}>
              <Text color='black'>Login</Text>
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


