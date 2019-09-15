import {createStackNavigator} from "react-navigation";
import Lobby from "./lobby";
import StartOrJoinGame from "./start-or-join-game";
import UserProfile from "./user-profile";

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
      navigationOptions: () => ({
        title: 'User Profile',
      })
    },
  },
  {
    initialRouteName: 'Lobby',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#28F1A6',
        elevation: 0,
        shadowOpacity: 0
      },
    }
  })
