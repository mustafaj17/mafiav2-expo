import React from 'react';
import {createSwitchNavigator, createAppContainer} from "react-navigation";
import {BackHandler, ToastAndroid} from 'react-native'
import PreGame from './pre-game';
import PreRound from './pre-round';
import InRound from './in-round';
import InVote from './in-vote';
import VotingResults from './voting-results';


const GameBrainNavigation =  createAppContainer(createSwitchNavigator(
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
))

export default class GameBrain extends React.Component {

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    render(){
        return <GameBrainNavigation />
    }
}