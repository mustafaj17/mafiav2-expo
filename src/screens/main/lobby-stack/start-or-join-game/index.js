import React, { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { firestore } from '../../../../services/firebase';
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import {
    setGameDisconnect,
    setPlayersDisconnect,
    setGameDocument,
    updateGameData,
    updatePlayersData,
} from '../../../../redux/actions/gameActions';
import { setUserIsAdmin } from '../../../../redux/actions/userActions';
import { FloatingLabelInput } from '../../../../components/floatingLabelInput/floatingLabelInput';

class StartOrJoinGame extends Component{

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('isUserStartingGame') ? 'Start Game' : 'Join Game'
    })

    state = {
        gameName : '',
        errorMessage: '',
        loading: false
    }


    startOrJoinGame = async () => {

        const { gameName } = this.state;
        let { navigation, setGameDoc, user } = this.props;
        const isUserStartingGame = this.props.navigation.getParam('isUserStartingGame', false);
        this.setState({ loading: true })

        try{
            const gameDoc = await firestore.collection('mafia-games').doc(gameName).get();

            //starting game - name taken
            if (gameDoc.exists && isUserStartingGame) {
                this.setState({ loading: false, errorMessage: "Game name taken" })
                return;
            }
            //joining game
            if(!isUserStartingGame) {
                //game dont exist
                if (!gameDoc.exists) {
                    this.setState({ loading: false, errorMessage: "This game does not exist" })
                    return;
                }
                //game has started
                if (gameDoc.exists && gameDoc.data().gameInProgress) {
                    this.setState({ loading: false, errorMessage: "This game has started" })
                    return;
                }
            }

            setGameDoc(gameDoc);
            gameDoc.ref.set({
                gameName: gameName,
                timestamp: new Date()
            });

            const playersColRef = gameDoc.ref.collection('players');

            playersColRef.doc(user.email).set({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                isAdmin: isUserStartingGame ? true : false,
                photoURL: user.photoURL
            });

            const disconnectFromPlayerCollection = playersColRef.onSnapshot(querySnapshot => {

                console.log('players onSnapshot')
                const players = [];

                querySnapshot.forEach( playerDocument => {
                    players.push(playerDocument.data())
                })

                this.props.updatePlayersData(players);

            });

            this.props.setPlayersDisconnect(disconnectFromPlayerCollection);



            const disconnectFromGame = gameDoc.ref.onSnapshot(doc => {

                console.log('game onSnapshot');

                this.props.updateGameData(doc.data());
            });

            this.props.setGameDisconnect(disconnectFromGame);

            navigation.navigate('PreGame')


        }catch (e){
            console.log(e);
            this.setState({loading: false,errorMessage: "not sure what went wrong"})
        }
    }

    render(){

        const { gameName, errorMessage, loading } = this.state;
        const setName = (text) => this.setState({gameName: text});
        const isUserStartingGame = this.props.navigation.getParam('isUserStartingGame');

        return (
          <View style={styles.page}>
              <FloatingLabelInput
                label={`Enter game ID`}
                onChangeText={(text) => setName(text)}
                value={gameName}
              />

              {loading && <ActivityIndicator size="small" />}

              <View>
                  <Text>{errorMessage}</Text>
              </View>
              <Button onPress={this.startOrJoinGame}
                      title={`${isUserStartingGame ? 'Start' : 'Join'}`}
                      style={styles.button}
                      disabled={loading} />
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
    setGameDoc: doc => dispatch(setGameDocument(doc))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartOrJoinGame);
