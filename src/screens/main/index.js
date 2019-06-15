import { createStackNavigator } from 'react-navigation'
import Lobby from './lobby';
import StartGame from './start-game';
import JoinGame from './join-game';
import InGame from './in-game';

export default createStackNavigator(
   {
       Lobby : { screen: Lobby,
           navigationOptions: () => ({
               gesturesEnabled: false,
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
       InGame: {
           screen: InGame,
           navigationOptions: () => ({
               gesturesEnabled: false,
           })
       },
   },
   {
       initialRouteName: 'Lobby'
   }
)