import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { firestore } from '../../../redux/store';


class JoinGame extends Component{

    state = {
        gameName : '',
        errorMessage: 'waiting'
    }

    joinGame = () => {

        const { gameName } = this.state;

        firestore.get({ collection: 'mafia-games', doc: gameName }).then( doc => {
            if (doc.exists) {
                if(!doc.data().gameInProgress) {
                    this.setState({errorMessage: "This game can be joined"})
                }else{
                    this.setState({errorMessage: "This game has started"})
                }
            } else {
                this.setState({errorMessage: "This game does not exist"})
            }
        }).catch( err => {
            console.log(err);
        })
    }

    render(){

        const { gameName, errorMessage } = this.state;
        const setName = (text) => this.setState({gameName: text});

        return (
           <View>
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
                   <TouchableOpacity onPress={this.joinGame}>
                       <Text>Join</Text>
                   </TouchableOpacity>
               </View>
           </View>
        )
    }
}

const mapStateToProps = (state) => ({
    firestore : state.firestore
})

export default connect(mapStateToProps)(JoinGame)