import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ProfilePicture from '../../../../components/profilePicture';
import * as Permissions from 'expo-permissions';
import globalStyles from '../../../../styles/global';
import ProfileImagePicker from '../../../../components/profileImagePicker/profileImagePicker';
import { uploadProfilePictureToFirebase, uriToBlob } from '../../../signup/utils';
import firebase from '../../../../services/firebase';
import { updateUserProfilePic, loadingUserPhotoToggle } from '../../../../redux/actions/userActions';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import MafiaBackground from '../../../../components/mafiaBackground';

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

    if(profilePicMode){
      return <ProfileImagePicker
        savePicture={(image) => this.saveProfilePicture(image)}
        hideProfileImagePicker={ () => this.setState({profilePicMode: false})}/>
    }

    return (
      <MafiaBackground>
        <View style={{alignSelf: 'center', marginTop: 50}}>
          <ProfilePicture imageUri={user.photoURL} size={200}/>
        </View>
        <View style={{marginTop: 25, marginLeft: 25}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text type='bold' size='small'>DisplayName:</Text>
            <Text size='small' style={{marginLeft: 8}}>{user.displayName}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text type='bold' size='small'>Email:</Text>
            <Text size='small' style={{marginLeft: 8}}>{user.email}</Text>
          </View>
        </View>
        <View style={{alignSelf: 'center', marginTop: 25}}>
        { hasCameraPermission === false ?
          <View >
            <Text style={{textAlign: 'center'}}>Mafia needs camera permissions</Text>
            <Text style={{textAlign: 'center'}}>Please change settings to add picture</Text>
          </View> :
          <Button onPress={this.takeProfilePic} >
            <Text color='black'>{ user.photoURL ? 'Change picture' : 'Add picture'}</Text>
          </Button>
        }
        </View>
      </MafiaBackground>
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
