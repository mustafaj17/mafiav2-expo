import {connect} from 'react-redux';
import firebase, {firestore} from '../../services/firebase';
import {
  View,
  Platform,
  Alert,
  TouchableOpacity, Image
} from 'react-native'
import Text from '../text';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-community/google-signin'
import {setUser, setUserStats} from '../../redux/actions/userActions';
import React, { useState, useEffect } from 'react'
import {COLLECTIONS} from '../../constants';
import Google from '../../../assets/google.png';
import Button from '../button';


const  GoogleLogin = ({ setUser, setUserStats }) => {
  useEffect(() => {
    configureGoogleSign()
  }, []);

  const [error, setError] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.signIn().then(async () => {
        const {accessToken, idToken} = await GoogleSignin.getTokens();
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        await firebase.auth().signInWithCredential(credential)
          .then(response => {
            setUser(response);
            initFirebaseUserProfile(response.email)
          });
      })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available')
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error)
      }
    }
  };

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: '328931836560-5pom41i5oov27df0kgi0vip808voao8k.apps.googleusercontent.com',
      offlineAccess: false
    })
  }

  // move this function into a higher scope as its used twice and will be used again for google
  const initFirebaseUserProfile = async (email) => {

    const { setUserStats } = this.props;

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
    <Button onPress={signIn} style={{flexDirection: 'row', width: '100%'}}>
      <View style={{flexDirection: 'row', width: '100%', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={Google}
          resizeMode="contain"
          style={{ width: 20, height: 30, marginRight: 8}}
        />
        <Text size="xsmall">Continue with Google</Text>
      </View>
    </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setUserStats: user => dispatch(setUserStats(user)),
});

export default connect(null, mapDispatchToProps)(GoogleLogin);
