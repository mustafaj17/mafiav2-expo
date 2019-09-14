import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { ProfilePicture } from '../../../../components/profilePicture/profilePicture';
import * as Permissions from 'expo-permissions';
import globalStyles from '../../../../styles/global';
import ProfileImagePicker from '../../../../components/profileImagePicker/profileImagePicker';
import { uploadProfilePictureToFirebase, uriToBlob } from '../../../signup/utils';
import firebase from '../../../../services/firebase';
import { updateUserProfilePic } from '../../../../redux/actions/userActions';

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
    const { user, updateProfilePic } = this.props;
    this.setState({profilePicMode: false});

    try{
      const blob = await uriToBlob(imageUri);
      const photoURL = await uploadProfilePictureToFirebase(blob, user.data.email);
      await firebase.auth().currentUser.updateProfile({photoURL});
      updateProfilePic(photoURL);
    }catch (e) {
      console.log(e);
    }

  }

  render() {
    const { hasCameraPermission, profilePicMode  } = this.state;
    const { user } = this.props;

    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}/>
    }

    return (
      <View style={globalStyles.page}>
        <ProfilePicture imageUri={user.data.photoURL}/>
        { hasCameraPermission === false ?
          <View>
            <Text style={{textAlign: 'center'}}>Mafia needs camera permissions</Text>
            <Text style={{textAlign: 'center'}}>Please change settings to add picture</Text>
          </View> :
          <Button title={ user.data.photoURL ? 'Change picture' : 'Add picture'}
                  onPress={this.takeProfilePic} />
        }
        <Text>{user.data.email}</Text>
        <Text>{user.data.displayName}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateProfilePic: photoURL => dispatch(updateUserProfilePic(photoURL))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
