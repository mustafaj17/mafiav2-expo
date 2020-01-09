import React from 'react'
import {connect} from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Modal
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
import PageTitle from '../../components/pageTitle';
import TermsModal from "../../components/termsModal";
import PrivacyModal from "../../components/privacyModal";
import HowToPlay from "./howToPlay";
import Constants from "expo-constants";

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
    usernameLimitReached: false,
    termsModalVisible: false,
    privacyModalVisible: false,
    isHowToPlayVisible: true
  };

  handleSignUp = async () => {

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
        this.props.setUser({ displayName })

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
      usernameLimitReached,
      termsModalVisible,
      privacyModalVisible
    } = this.state;

    if(this.state.loading) return( <LoadingScreen/> );


    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}/>
    }

    return (
      <MafiaBackground>
        <Modal visible={this.state.isHowToPlayVisible} transparent animationType='fade'>
          <View style={{flex: 1, padding: 20, paddingTop: 20 + Constants.statusBarHeight, backgroundColor: 'rgba(0,0,0, 0.7)'}}>
            <HowToPlay skipInstructions={() => this.setState({isHowToPlayVisible: false})} isModal />
          </View>
        </Modal>
        <TermsModal
          termsModalVisible={termsModalVisible}
          closeModal={() => this.setState({termsModalVisible: false})}
        />
        <PrivacyModal
          privacyModalVisible={privacyModalVisible}
          closeModal={() => this.setState({privacyModalVisible: false})}
        />
        <KeyboardAvoidingView style={globalStyles.page} behavior="padding" enabled>
          <PageTitle title='SIGN UP'/>
          <ScrollView style={{ flex: 1, paddingTop: 20,  paddingBottom: 50, width: '100%'}}>

            <View>
              <FloatingLabelInput
                label="Display Name"
                value={displayName}
                onChangeText={this.handleDisplayNameInput}
              />
              <Text size='xsmall' type='light'
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      right: 20,
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

            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20}}>

              <ProfilePicture imageUri={imageUri} size={60}/>

              { hasCameraPermission === false ?
                <View>
                  <Text style={{textAlign: 'center'}}>Mafia needs camera permissions</Text>
                  <Text style={{textAlign: 'center'}}>Please change settings</Text>
                  <Text style={{textAlign: 'center'}}>You can do this later if you like.</Text>
                </View> :
                <Button onPress={this.takeProfilePic} style={{backgroundColor: 'none', padding: 10, borderColor: 'whitesmoke'}}>
                  <Text >{ !imageUri ? 'Add Profile Pic' : 'Change pic' }</Text>
                </Button>
              }
            </View>

            <View style={
              {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 20,
              }
            }>

              <Text  type='light' size='small' letterSpacing={1}>
                {'By creating an account you are agreeing to our '}
                <Text onPress={()=>this.setState({termsModalVisible: true})} color='#00EB0A' type='light' size='small' letterSpacing={1}>
                  terms and conditions
                </Text>
                {' and '}
                <Text onPress={()=>this.setState({privacyModalVisible: true})} color='#00EB0A' type='light' size='small' letterSpacing={1}>
                  privacy policy
                </Text>
                .
              </Text>
            </View>

          </ScrollView>


          {errorMessage &&
          <View style={{paddingLeft: 10, paddingRight: 10}}>
            <ErrorMessage errorMessage={errorMessage}/>
          </View>
          }


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
