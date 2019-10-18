import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ProfilePicture from '../../../../components/profilePicture';
import * as Permissions from 'expo-permissions';
import ProfileImagePicker from '../../../../components/profileImagePicker/profileImagePicker';
import { uploadProfilePictureToFirebase, uriToBlob } from '../../../signup/utils';
import firebase from '../../../../services/firebase';
import { updateUserProfilePic, loadingUserPhotoToggle } from '../../../../redux/actions/userActions';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import {FloatingLabelInput} from "../../../../components/floatingLabelInput/floatingLabelInput";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";


class UserProfile extends React.Component {

  state ={}

  takeProfilePic = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const permissionGranted = status === 'granted';
    if(permissionGranted){
      this.setState({ hasCameraPermission: true, profilePicMode: true });
    }else{
      this.setState({ hasCameraPermission: false });
    }
  }

  saveProfilePicture = async (imageUri) => {
    const { user, updateProfilePic, loadUserPhotoToggle  } = this.props;
    this.setState({profilePicMode: false});

    try{
      loadUserPhotoToggle();
      const blob = await uriToBlob(imageUri);
      const photoURL = await uploadProfilePictureToFirebase(blob, user.email);
      await firebase.auth().currentUser.updateProfile({photoURL});
      updateProfilePic(photoURL);
      loadUserPhotoToggle();
    }catch (e) {
      console.log(e);
    }

  }

  render() {
    const { hasCameraPermission, profilePicMode  } = this.state;
    const { user } = this.props;

    console.log(user.displayName);
    console.log(user.email);

    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}/>
    }

    return (
      <ScrollView>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {user.stats &&
          <View style={{marginTop: 40}}>
            <Text>Games Played : {user.stats.gamesPlayed}</Text>
            <Text>Games Won : {user.stats.gamesWon}</Text>
            <Text>Games Won as Mafia : {user.stats.gamesWonAsMafia}</Text>
            <Text>Games Won as Civilian : {user.stats.gamesPlayed - user.stats.gamesWonAsMafia - user.stats.gamesLeft}</Text>
            <Text>Games Left : {user.stats.gamesLeft}</Text>
          </View>}

          <View style={{marginTop: 30}}>
            <ProfilePicture imageUri={user.photoURL} size={200}/>
            { hasCameraPermission === false ?
              <View >
                <Text size='small' style={{textAlign: 'center'}}>Mafia needs camera permissions</Text>
                <Text size='small' style={{textAlign: 'center'}}>Please change settings to add picture</Text>
              </View> :
              <TouchableOpacity onPress={this.takeProfilePic} >
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0
                }}>
                  { user.photoURL ?
                    <MaterialIcons name='edit' color='#000' size={34}/> :
                    <FontAwesome name='plus' color='#000' size={34}/>
                  }
                </View>
              </TouchableOpacity>
            }
          </View>

          <FloatingLabelInput
            style={{backgroundColor: '#e2e2e2', opacity: 0.7}}
            editable={false}
            label='Email'
            value={user.email}
          />

          <FloatingLabelInput
            style={{backgroundColor: '#e2e2e2', opacity: 0.7}}
            editable={false}
            label='Display Name'
            value={user.displayName}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateProfilePic: photoURL => dispatch(updateUserProfilePic(photoURL)),
  loadUserPhotoToggle: () => dispatch(loadingUserPhotoToggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
