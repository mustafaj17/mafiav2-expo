import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { firestore } from '../../../services/firebase';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { startGame } from '../../../redux/actions/gameActions';

class StartGame extends Component{

    state = {
        gameName : '',
        errorMessage: 'waiting'
    }


    startGame = () => {

        const {gameName} = this.state;
        const { navigation, startGame }  = this.props;


        firestore.collection('mafia-games').doc(gameName).get().then(doc => {

            if (doc.exists) {
                this.setState({errorMessage: "Game name taken"})
            } else {
                doc.ref.set({
                    gameName: gameName,
                    timestamp: new Date()
                });
                startGame(doc);
                navigation.navigate('InGame')
            }
        }).catch( (e) => {
            console.log(e);
            this.setState({errorMessage: "not sure what went wrong"})
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
                   <TouchableOpacity onPress={this.startGame} style={styles.button}>
                       <Text>Start</Text>
                   </TouchableOpacity>
               </View>
           </View>
        )
    }
}


const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    startGame: doc => dispatch(startGame(doc))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);