import {createStackNavigator} from "react-navigation";
import PreGame from './pre-game';
import PreRound from './pre-round';
import InRound from './in-round';
import InVote from './in-vote';
import VotingResults from './voting-results';

export default createStackNavigator(
   {
     PreGame: { screen: PreGame,
       navigationOptions: () => ({
         gesturesEnabled: false,
       })
     },
       PreRound : { screen: PreRound,
           navigationOptions: () => ({
               gesturesEnabled: false,
           })
       },
       InRound : {
           screen: InRound,
           navigationOptions: () => ({
               gesturesEnabled: false,
           })
       },
       InVote : {
           screen: InVote,
           navigationOptions: () => ({
               gesturesEnabled: false,
           })
       },
       VotingResults: {
           screen: VotingResults,
           navigationOptions: () => ({
               gesturesEnabled: false,
           })
       },
   },
   {
       initialRouteName: 'PreGame',
       headerMode: 'none',
   }
)