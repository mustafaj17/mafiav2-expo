import React, { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { firestore } from '../../../services/firebase';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { startGame } from '../../../redux/actions/gameActions';
import { setUserIsAdmin } from '../../../redux/actions/userActions';

class StartGame extends Component{

    state = {
        gameName : '',
        errorMessage: '',
        loading: false
    }


    startGame = () => {

        const { gameName } = this.state;
        const { navigation, startGame, setUserIsAdmin }  = this.props;
        this.setState({loading: true})


        firestore.collection('mafia-games').doc(gameName).get().then(doc => {

            if (doc.exists) {
                this.setState({loading: false, errorMessage: "Game name taken"})
            } else {
                doc.ref.set({
                    gameName: gameName,
                    timestamp: new Date()
                });
                setUserIsAdmin();
                startGame(doc);
                navigation.navigate('GameBrain')
            }
        }).catch( (e) => {
            console.log(e);
            this.setState({loading: false,errorMessage: "not sure what went wrong"})
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

               {loading && <ActivityIndicator size="small" />}

               <View>
                   <Text>{errorMessage}</Text>
               </View>
                   <Button onPress={this.startGame} title="Start" style={styles.button} disabled={loading} />
           </View>
        )
    }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    startGame: doc => dispatch(startGame(doc)),
    setUserIsAdmin: () => dispatch(setUserIsAdmin())
})

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
