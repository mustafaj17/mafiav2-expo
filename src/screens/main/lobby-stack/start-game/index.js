import React, { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { firestore } from '../../../../services/firebase';
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import {
    setGameDisconnect,
    setPlayersDisconnect,
    startGame,
    updateGameData,
    updatePlayersData,
} from '../../../../redux/actions/gameActions';
import { setUserIsAdmin } from '../../../../redux/actions/userActions';

class StartGame extends Component{

    state = {
        gameName : '',
        errorMessage: '',
        loading: false
    }


    startGame = async () => {

        const { gameName } = this.state;
        let { navigation, startMafiaGame, user } = this.props;
        this.setState({ loading: true })

        try{
            const doc = await firestore.collection('mafia-games').doc(gameName).get();
            if (doc.exists) {
                this.setState({ loading: false, errorMessage: "Game name taken" })
            } else {
                doc.ref.set({
                    gameName: gameName,
                    timestamp: new Date()
                });
                startMafiaGame(doc);

                const playersColRef = doc.ref.collection('players');

                playersColRef.doc(user.email).set({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    isAdmin: true
                });

                const disconnectFromPlayerCollection = playersColRef.onSnapshot(querySnapshot => {

                    console.log('players onSnapshot')
                    const players = [];

                    querySnapshot.forEach( playerDocument => {
                        players.push(playerDocument.data())
                    })

                    this.props.updatePlayersData(players);

                });

                // this.props.setConnectedToPlayerCollection();
                this.props.setPlayersDisconnect(disconnectFromPlayerCollection);



                const disconnectFromGame = doc.ref.onSnapshot(doc => {

                    console.log('game onSnapshot');

                    this.props.updateGameData(doc.data());
                });

                // this.props.setConnectedToGameDoc();
                this.props.setGameDisconnect(disconnectFromGame);

                navigation.navigate('PreGame')

            }
        }catch (e){
            console.log(e);
            this.setState({loading: false,errorMessage: "not sure what went wrong"})
        }
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
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    updateGameData: data => dispatch(updateGameData(data)),
    updatePlayersData: data => dispatch(updatePlayersData(data)),
    setGameDisconnect: gameDisconnect => dispatch(setGameDisconnect(gameDisconnect)),
    setPlayersDisconnect: playersDisconnect => dispatch(setPlayersDisconnect(playersDisconnect)),
    startMafiaGame: doc => dispatch(startGame(doc))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
