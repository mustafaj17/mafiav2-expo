import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../../../components/button';
import Text from '../../../../components/text';
import AnimateLogo from '../../../../components/amimatedLogo';

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

        const { gameName, loading } = this.state;

        if(loading){
            return;
        }

        if(gameName.length === 0){
            this.setState({ errorMessage: "Please enter a game name" });
            return;
        }

        this.setState({ loading: true })
        let { navigation, setGameDoc, user } = this.props;
        const isUserStartingGame = this.props.navigation.getParam('isUserStartingGame', false);

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


            if(isUserStartingGame){
                gameDoc.ref.set({
                    gameName: gameName,
                    timestamp: new Date()
                });
            }
            setGameDoc(gameDoc);

            const playersColRef = gameDoc.ref.collection('players');

            playersColRef.doc(user.email).set({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                isAdmin: !!isUserStartingGame,
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
          <LinearGradient
            start={{x: 0, y: -0.5}} end={{x: 0, y: 1}}
            colors={['#2bbb81', '#3670bf']}
            style={{ flex: 1, width: '100%' }}>
              <View style={styles.page}>

                  {loading ? <AnimateLogo/> :

                    <>
                        <FloatingLabelInput
                          autoFocus={true}
                          label={`Enter game ID`}
                          onChangeText={(text) => setName(text)}
                          value={gameName}
                          onSubmitEditing={this.startOrJoinGame}
                          returnKeyType='go'
                          autoCapitalize='none'
                        />


                        <View>
                            <Text color='pink'>{errorMessage}</Text>
                        </View>
                        <Button onPress={this.startOrJoinGame}>
                            <Text color='black'>{isUserStartingGame ? 'Start' : 'Join'}</Text>
                        </Button>
                    </>
                  }
              </View>
          </LinearGradient>
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
