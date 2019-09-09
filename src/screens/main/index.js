import { createSwitchNavigator} from 'react-navigation'
import LobbyStack from './lobby-stack'
import PreGame from "./pre-game";
import PreRound from "./pre-round";
import InRound from "./in-round";
import InVote from "./in-vote";
import VotingResults from "./voting-results";
import GameOver from "./game-over";

export default createSwitchNavigator(
  {
    LobbyStack: {
      screen: LobbyStack,
      navigationOptions: () => ({
        gesturesEnabled: false,
      })
    },
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
    GameOver: {
      screen: GameOver,
      navigationOptions: () => ({
        gesturesEnabled: false,
      })
    },
  },
  {
    initialRouteName: 'LobbyStack',
  }
)
