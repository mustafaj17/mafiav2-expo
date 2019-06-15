import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import firebase from '../../../services/firebase';
import styles from '../../../styles/global';
import { NavigationEvents } from 'react-navigation';

export default class Lobby extends Component {

    static navigationOptions = { header: null }
    state = {
        currentUser: null,
    }

    screenWillFocus= () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    screenWillBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const { currentUser } = firebase.auth();
        this.setState({ currentUser })
    }

    handleJoinGame = () => {
        this.props.navigation.navigate('JoinGame')
    }

    handleStartGame = () => {
        this.props.navigation.navigate('StartGame')
    }

    render(){

        const { currentUser } = this.state;

        return(
           <View style={styles.page}>
               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />
               {currentUser && <Text>Hello {currentUser.email}!</Text>}
               <TouchableOpacity  onPress={this.handleJoinGame} style={styles.button}>
                   <Text >Join Game</Text>
               </TouchableOpacity>
               <TouchableOpacity  onPress={this.handleStartGame} style={styles.button}>
                   <Text >Start New Game</Text>
               </TouchableOpacity>
           </View>
        )
    }
}
