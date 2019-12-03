import {createStackNavigator} from "react-navigation";
import Lobby from "./lobby";
import StartOrJoinGame from "./start-or-join-game";
import UserProfile from "./user-profile";
import Constants from 'expo-constants';

export default createStackNavigator({
    Lobby : {
      screen: Lobby,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null,
      })
    },
    StartOrJoinGame : {
      screen: StartOrJoinGame
    },
    UserProfile : {
      screen: UserProfile,
    },
  },
  {
    initialRouteName: 'Lobby',
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTintColor: 'black',
      headerBackTitle: null,
      headerStyle: {
        marginTop: -Constants.statusBarHeight,
      },
    }
  })
