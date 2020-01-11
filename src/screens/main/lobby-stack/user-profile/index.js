import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ProfilePicture from '../../../../components/profilePicture';
import * as Permissions from 'expo-permissions';
import ProfileImagePicker from '../../../../components/profileImagePicker/profileImagePicker';
import {
  uploadProfilePictureToFirebase,
  uriToBlob,
} from '../../../signup/utils';
import firebase from '../../../../services/firebase';
import {
  updateUserProfilePic,
  loadingUserPhotoToggle,
} from '../../../../redux/actions/userActions';
import Text from '../../../../components/text';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ModalConfirm from '../../../../components/modalConfirm';
import MafiaBackground from '../../../../components/mafiaBackground';

class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // headerTitle instead of title
      headerTitle: () => (
        <Text type="bold" size="small">
          User Profile
        </Text>
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={navigation.getParam('openModal')}>
          <MaterialIcons name="exit-to-app" color="white" size={28} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    signOutModal: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openModal: () => this.setState({ signOutModal: true }),
    });
  }

  takeProfilePic = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const permissionGranted = status === 'granted';
    if (permissionGranted) {
      this.setState({ hasCameraPermission: true, profilePicMode: true });
    } else {
      this.setState({ hasCameraPermission: false });
    }
  };

  saveProfilePicture = async imageUri => {
    const { user, updateProfilePic, loadUserPhotoToggle } = this.props;
    this.setState({ profilePicMode: false });

    try {
      loadUserPhotoToggle();
      const blob = await uriToBlob(imageUri);
      const photoURL = await uploadProfilePictureToFirebase(blob, user.email);
      await firebase.auth().currentUser.updateProfile({ photoURL });
      updateProfilePic(photoURL);
      loadUserPhotoToggle();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { hasCameraPermission, profilePicMode, signOutModal } = this.state;
    const { user } = this.props;

    if (profilePicMode) {
      return (
        <ProfileImagePicker
          savePicture={image => this.saveProfilePicture(image)}
          hideProfileImagePicker={() =>
            this.setState({ profilePicMode: false })
          }
        />
      );
    }

    return (
      <MafiaBackground>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            opacity: signOutModal ? 0.3 : 1,
          }}>
          <ModalConfirm
            visible={signOutModal}
            onConfirm={() => firebase.auth().signOut()}
            onCancel={() => this.setState({ signOutModal: false })}
          />

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View style={{ margin: 10, marginTop: 50 }}>
              <ProfilePicture imageUri={user.photoURL} size={200} />

              <TouchableOpacity
                onPress={this.takeProfilePic}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}>
                <View>
                  {user.photoURL ? (
                    <MaterialIcons name="edit" color="white" size={28} />
                  ) : (
                    <FontAwesome name="plus" color="white" size={28} />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{ textAlign: 'center' }}>{user.displayName}</Text>
              <Text style={{ textAlign: 'center' }} size="small" color="grey">
                {user.email}
              </Text>
            </View>

            {hasCameraPermission === false && (
              <View style={{ marginTop: 10 }}>
                <Text size="small" type="light" style={{ textAlign: 'center' }}>
                  Mafia needs camera permissions
                </Text>
                <Text size="small" type="light" style={{ textAlign: 'center' }}>
                  Please change settings to add picture
                </Text>
              </View>
            )}
          </View>

          {user.stats && (
            <View style={{ margin: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text type="bold" color='#00EB0A'>Stats</Text>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginRight: 10 }}>
                  {user.stats.gamesPlayed}
                </Text>
                <Text color="grey">Games Played</Text>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginRight: 10 }}>{user.stats.gamesWon}</Text>
                <Text color="grey">Games Won</Text>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginRight: 10 }}>
                  {user.stats.gamesWonAsMafia}
                </Text>
                <Text color="grey">Games Won as Mafia</Text>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginRight: 10 }}>
                  {user.stats.gamesWon - user.stats.gamesWonAsMafia}
                </Text>
                <Text color="grey">Games Won as Civilian</Text>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ marginRight: 10 }}>{user.stats.gamesLeft}</Text>
                <Text color="grey">Quit games</Text>
              </View>
            </View>
          )}
        </View>
      </MafiaBackground>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateProfilePic: photoURL => dispatch(updateUserProfilePic(photoURL)),
  loadUserPhotoToggle: () => dispatch(loadingUserPhotoToggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
