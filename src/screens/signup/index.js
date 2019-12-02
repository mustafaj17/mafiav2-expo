import React from 'react'
import {connect} from "react-redux";
import {
  View,
  Switch,
  KeyboardAvoidingView, ScrollView,
} from 'react-native';
import firebase from '../../services/firebase';
import ProfileImagePicker from '../../components/profileImagePicker/profileImagePicker';
import { uploadProfilePictureToFirebase, uriToBlob } from './utils';
import globalStyles from '../../styles/global'
import ProfilePicture from '../../components/profilePicture';
import * as Permissions from 'expo-permissions';
import LoadingScreen from '../../components/loadingScreen';
import { FloatingLabelInput } from '../../components/floatingLabelInput/floatingLabelInput';
import MafiaBackground from '../../components/mafiaBackground';
import Text from '../../components/text';
import Button from '../../components/button';
import ErrorMessage from '../../components/errorMessage';
import {setUser} from "../../redux/actions/userActions";

const DISPLAY_NAME_LIMIT = 12;

class SignUp extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null,
    displayName: '',
    imageUri: null,
    loading: false ,
    profilePicMode : false,
    termsAccepted: false,
    usernameLimitReached: false
  }

  handleSignUp = async () => {

    if(!this.state.termsAccepted){
      this.setState({errorMessage: 'Please accept terms'})
      return;
    }
    this.setState({loading: true})
    const { email, password, displayName, imageUri} = this.state
    try {

      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if(imageUri) {
        const blob = await uriToBlob(imageUri);
        const photoURL = await uploadProfilePictureToFirebase(blob, userCredentials.user.email);
        userCredentials.user.updateProfile({displayName: displayName, photoURL});
        this.props.setUser({ photoURL, displayName })
      } else {
        userCredentials.user.updateProfile({displayName: displayName});
      }
      this.props.navigation.navigate('Main')

    } catch (error) {

      this.setState({loading: false, errorMessage: error.message})
    }

  }

  takeProfilePic = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const permissionGranted = status === 'granted';
    if(permissionGranted){
      this.setState({ hasCameraPermission: true, profilePicMode: true });
    }else{
      this.setState({ hasCameraPermission: false });
    }
  }

  saveProfilePicture = (imageUri) => {
    this.setState({imageUri, profilePicMode: false});
  }

  handleDisplayNameInput = value => {
    if(value.length > DISPLAY_NAME_LIMIT){
      this.setState({usernameLimitReached: true})
      return;
    }
    this.setState({ displayName: value, usernameLimitReached: false })
  }

  render() {

    const {
      displayName,
      email,
      password,
      profilePicMode,
      imageUri,
      errorMessage,
      hasCameraPermission,
      termsAccepted,
      usernameLimitReached
    } = this.state;

    if(this.state.loading) return( <LoadingScreen/> );


    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}/>
    }

    return (
      <MafiaBackground>
        <KeyboardAvoidingView style={globalStyles.page} behavior="padding" enabled>
          <ScrollView style={{ flex: 1, paddingTop: 50,  paddingBottom: 50, width: '100%'}}>

            <View>
              <FloatingLabelInput
                label="Display Name"
                value={displayName}
                onChangeText={this.handleDisplayNameInput}
              />
              <Text size='small' type='light'
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      left: 20,
                      color: (usernameLimitReached ? 'red' : 'grey')
                    }}>Max {DISPLAY_NAME_LIMIT} characters</Text>
            </View>

            <FloatingLabelInput
              label="Email"
              onChangeText={ value => this.setState({ email: value })}
              value={email}
            />
            <FloatingLabelInput
              secureTextEntry={true}
              label="Password"
              onChangeText={ value => this.setState({ password: value })}
              value={password}
            />

            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>

              <ProfilePicture imageUri={imageUri} size={100}/>

              { hasCameraPermission === false ?
                <View>
                  <Text style={{textAlign: 'center'}}>Mafia needs camera permissions</Text>
                  <Text style={{textAlign: 'center'}}>Please change settings</Text>
                  <Text style={{textAlign: 'center'}}>You can do this later if you like.</Text>
                </View> :
                <Button onPress={this.takeProfilePic} style={{borderWidth: 1, padding: 10 }}>
                  <Text >{ !imageUri ? 'Add Profile Pic' : 'Change pic' }</Text>
                </Button>
              }
            </View>

          </ScrollView>
          <View style={
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }
          }>

            <Text type='light' size='xsmall' style={{marginRight: 10}}>
              I agree to the Terms & Conditions
            </Text>

            <Switch value={termsAccepted} onChange={()=>this.setState({termsAccepted: !termsAccepted})}/>
          </View>

          {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}

          <Button onPress={this.handleSignUp}>
            <Text >Create account</Text>
          </Button>

        </KeyboardAvoidingView>
      </MafiaBackground>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(SignUp)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//   },
// })
