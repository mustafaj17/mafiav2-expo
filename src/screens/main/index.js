import { createStackNavigator } from 'react-navigation'
import Lobby from './lobby';
import StartGame from './start-game';
import JoinGame from './join-game';
import GameBrain from './game-brain';

export default createStackNavigator(
   {
       Lobby : {
           screen: Lobby,
           navigationOptions: () => ({
               gesturesEnabled: false,
               header: null,
           })
       },
       StartGame : {
           screen: StartGame,
           navigationOptions: () => ({
               title: 'Start Game',
           })
       },
       JoinGame : {
           screen: JoinGame,
           navigationOptions: () => ({
               title: 'Join Game',
           })
       },
       GameBrain: {
           screen: GameBrain,
           navigationOptions: () => ({
               gesturesEnabled: false,
               header: null,
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
  }
)