import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { firestore } from '../../../services/firebase';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { joinGame } from '../../../redux/actions/gameActions';

class JoinGame extends Component{

    state = {
        gameName : '',
        errorMessage: '',
        loading: false
    }

    joinGame = () => {

        const {gameName} = this.state;
        const { navigation, joinGame } = this.props;

        firestore.collection('mafia-games').doc(gameName).get().then(doc => {
            if (doc.exists) {
                if (!doc.data().gameInProgress) {
                    joinGame(doc);
                    navigation.navigate('GameBrain')
                } else {
                    this.setState({loading: false, errorMessage: "This game has started"})
                }
            } else {
                this.setState({loading: false, errorMessage: "This game does not exist"})
            }
        }).catch( (e) => {
            console.log(e);
            this.setState({loading: false, errorMessage: "not sure what went wrong"})
        })
    }

    render(){

        const { gameName, errorMessage, loading } = this.state;
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

               <Button onPress={this.joinGame} title="Join" disabled={loading} style={styles.button}/>
           </View>
        )
    }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
    joinGame: doc => dispatch(joinGame(doc))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);
