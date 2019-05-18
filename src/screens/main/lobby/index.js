import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../../../services/firebase';

export default class Lobby extends Component {

    static navigationOptions = { header: null }
    state = {
        currentUser: null,
    }


    componentDidMount() {
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
           <View style={styles.lobbyScreen}>
               {currentUser && <Text>Hello {currentUser.email}!</Text>}
               <TouchableOpacity  onPress={this.handleJoinGame}>
                   <Text >Join Game</Text>
               </TouchableOpacity>
               <TouchableOpacity  onPress={this.handleStartGame}>
                   <Text >Start New Game</Text>
               </TouchableOpacity>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    lobbyScreen: {
           paddingTop: 50
       }
   }
);
