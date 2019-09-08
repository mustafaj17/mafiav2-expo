import React from 'react'
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView, BackHandler, ToastAndroid,Animated
} from 'react-native';
import firebase from '../../services/firebase';
import ProfileImagePicker from './profileImagePicker';
import Constants from 'expo-constants';
import { uploadProfilePictureToFirebase, uriToBlob } from './utils';
import globalStyles from '../../styles/global'
import { ProfilePicture } from '../../components/profilePicture';

export default class SignUp extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null,
    displayName: '',
    imageUri: null,
    loading: false ,
    profilePicMode : false
  }

  handleSignUp = async () => {
    this.setState({loading: true})
    const { email, password, displayName, imageUri} = this.state


    try {

      if(!imageUri){
        throw Error('Please add profile picture');
      }
      const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const blob = await uriToBlob(imageUri);
      const photoURL = await uploadProfilePictureToFirebase(blob, userCredentials.user.email);
      userCredentials.user.updateProfile({displayName: displayName, photoURL});
      this.props.navigation.navigate('Main')

    } catch (error) {

      this.setState({loading: false, errorMessage: error.message})
    }

  }

  takeProfilePic = () => {
    this.setState({profilePicMode: true})
  }

  saveProfilePicture = (imageUri) => {
    this.setState({imageUri, profilePicMode: false});
  }

  render() {

    const { displayName, email, password, profilePicMode, imageUri, errorMessage } = this.state;



    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}
      />
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

        <View>
          <Button
            title={!imageUri ? 'Add Profile Pic' : 'Change pic'}
            onPress={this.takeProfilePic}
          />

          {imageUri && <ProfilePicture imageUri={imageUri}/>}
        </View>

        <Button
          title="Create account"
          onPress={this.handleSignUp}
        />

      </KeyboardAvoidingView>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


class FloatingLabelInput extends React.Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    const isFocused = this.props.value.length > 0;
    this._animatedIsFocused = new Animated.Value(isFocused ? 1 : 0);

  }


  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: (this.props.value.length > 0) });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label,value, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    return (
      <View style={{ paddingTop: 18, width: '100%' }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          value={value}
          style={{marginBottom: 10, height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

