import React from 'react'
import {
  Button,
  View,
  Text,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from '../../services/firebase';
import ProfileImagePicker from '../../components/profileImagePicker/profileImagePicker';
import { uploadProfilePictureToFirebase, uriToBlob } from './utils';
import globalStyles from '../../styles/global'
import { ProfilePicture } from '../../components/profilePicture/profilePicture';
import * as Permissions from 'expo-permissions';
import LoadingScreen from '../../components/loadingScreen';
import { FloatingLabelInput } from '../../components/floatingLabelInput/floatingLabelInput';

export default class SignUp extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null,
    displayName: '',
    imageUri: null,
    loading: false ,
    profilePicMode : false,
    termsAccepted: false
  }

  handleSignUp = async () => {

    this.setState({loading: true})
    const { email, password, displayName, imageUri} = this.state
    try {

      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if(imageUri) {
        const blob = await uriToBlob(imageUri);
        const photoURL = await uploadProfilePictureToFirebase(blob, userCredentials.user.email);
        userCredentials.user.updateProfile({displayName: displayName, photoURL});
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

  render() {

    const {
      displayName,
      email,
      password,
      profilePicMode,
      imageUri,
      errorMessage,
      hasCameraPermission,
      termsAccepted
    } = this.state;



    if(this.state.loading) return( <LoadingScreen/> );


    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}/>
    }

    return (

      <KeyboardAvoidingView style={globalStyles.page} behavior="padding" enabled>
        <Text>{errorMessage}</Text>

        <FloatingLabelInput
          label="Display Name"
          value={displayName}
          onChangeText={value => this.setState({ displayName: value })}
        />
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
          { hasCameraPermission === false ?
            <View>
              <Text style={{textAlign: 'center'}}>Mafia needs camera permissions</Text>
              <Text style={{textAlign: 'center'}}>Please change settings</Text>
              <Text style={{textAlign: 'center'}}>You can do this later if you like.</Text>
            </View> :
            <Button title={ !imageUri ? 'Add Profile Pic' : 'Change pic' }
                    onPress={this.takeProfilePic} />
          }


          <ProfilePicture imageUri={imageUri}/>
        </View>

        {/*Todo : Create terms page once new StackNavigation is merged into Master*/}
        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <Text>I have read and agree to the
            <Text
              onPress={() => this.props.navigation.navigate('Terms')}
              style = {{ color: 'blue', textDecorationLine: 'underline' }}
            >
              Terms & Conditions
            </Text>.
          </Text>
          <Switch value={termsAccepted} onChange={()=>this.setState({termsAccepted: !termsAccepted})}/>
        </View>

        <Button
          disabled={!termsAccepted}
          title="Create account"
          onPress={this.handleSignUp}
        />

      </KeyboardAvoidingView>

    )
  }
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Constants.statusBarHeight,
//   },
// })
