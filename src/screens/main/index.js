import React from 'react'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import LobbyStack from './lobby-stack'
import PreGame from "./pre-game";
import PreRound from "./pre-round";
import InRound from "./in-round";
import InVote from "./in-vote";
import VotingResults from "./voting-results";
import VotingDraw from "./voting-draw";
import GameOver from "./game-over";


export default createAnimatedSwitchNavigator(
  {
    LobbyStack: LobbyStack,
    PreGame: PreGame,
    PreRound:  PreRound,
    InRound: InRound,
    InVote : InVote,
    VotingResults: VotingResults,
    VotingDraw: VotingDraw,
    GameOver: GameOver
  }, {
    initialRouteName: 'LobbyStack',
  }
);
