import { createStackNavigator } from 'react-navigation';
import Lobby from './lobby';
import StartOrJoinGame from './start-or-join-game';
import UserProfile from './user-profile';
import { Dimensions, Platform } from 'react-native';

export default createStackNavigator(
  {
    Lobby: {
      screen: Lobby,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null,
      }),
    },
    StartOrJoinGame: {
      screen: StartOrJoinGame,
    },
    UserProfile: {
      screen: UserProfile,
    },
  },
  {
    initialRouteName: 'Lobby',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTransparent: true,
      headerTintColor: 'white',
      headerStyle: {
        marginTop: -getPadding()
      }
    },
  },
);

export function getPadding(){
  return Platform.OS === 'android' ? 0 : isIphoneX() ? 40 : 30;
}

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}

export function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}

