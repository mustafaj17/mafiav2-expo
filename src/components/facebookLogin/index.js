import React from 'react';
import {connect} from 'react-redux';
import {Image, Platform, View, TouchableOpacity} from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase, {firestore} from '../../services/firebase';
import {setUser, setUserStats} from '../../redux/actions/userActions';
import {COLLECTIONS} from '../../constants';
import Facebook from '../../../assets/facebook.png';
import Text from '../text';
import mafia from '../../../assets/mafia-icon.png';
import Button from '../button';

const  FBLoginButton = ({ setUser, setUserStats }) => {

  const facebookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('name, email');
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInAndRetrieveDataWithCredential(credential)
              .then(response => {
                console.log('user:', response.user);
                setUser(response.user);
                initFirebaseUserProfile(response.user.email)
              })
              .catch((error) => {
                console.log('errormessage', error);
              });
          });
        }}
    )};

  // move this function into a higher scope as its used twice and will be used again for google
  const initFirebaseUserProfile = async (email) => {

    const newUserProfile = {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesWonAsMafia: 0,
      gamesLeft: 0,
      joinDate: new Date(),
      device: Platform.OS
    };

    try {
      await firestore.collection(COLLECTIONS.STATS).doc(email).set({
        ...newUserProfile
      })
    } catch (error) {
      console.log('error', error);
    }
    setUserStats(newUserProfile);
  };


  return (
      <Button onPress={facebookLogin} style={{flexDirection: 'row', width: '100%'}}>
        <Image
          source={Facebook}
          resizeMode="contain"
          style={{ width: 30, height: 30 }}
        />
        <Text size="xsmall">Continue with Facebook</Text>
      </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setUserStats: user => dispatch(setUserStats(user)),
});

export default connect(null, mapDispatchToProps)(FBLoginButton);
