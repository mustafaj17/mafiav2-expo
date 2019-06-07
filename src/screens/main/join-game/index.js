import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { firestore } from '../../../services/firebase';
import styles from '../../../styles/global';


export default class JoinGame extends Component{

    state = {
        gameName : '',
        errorMessage: 'waiting'
    }

    joinGame = () => {

        const {gameName} = this.state;

        firestore.collection('mafia-games').doc(gameName).get().then(doc => {
            if (doc.exists) {
                if (!doc.data().gameInProgress) {
                    this.setState({errorMessage: "This game can be joined"})
                } else {
                    this.setState({errorMessage: "This game has started"})
                }
            } else {
                this.setState({errorMessage: "This game does not exist"})
            }
        })
    }

    render(){

        const { gameName, errorMessage } = this.state;
        const setName = (text) => this.setState({gameName: text});

        return (
           <View style={styles.page}>
               <View >
                   <TextInput
                      onChangeText={(text) => setName(text)}
                      value={gameName}
                      placeholder='Enter game ID'/>

               </View>

               <View>
                   <Text>{errorMessage}</Text>
               </View>
               <View>
                   <TouchableOpacity onPress={this.joinGame} style={styles.button}>
                       <Text>Join</Text>
                   </TouchableOpacity>
               </View>
           </View>
        )
    }
}