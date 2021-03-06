import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
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
import MafiaBackground from '../../../../components/mafiaBackground';
import { COLLECTIONS } from '../../../../constants';
import ErrorMessage from '../../../../components/errorMessage';
import LoadingScreen from '../../../../components/loadingScreen';
import PageTitle from "../../../../components/pageTitle";

class StartOrJoinGame extends Component {
  // static navigationOptions = ({navigation}) => ({
  //     title: navigation.getParam('isUserStartingGame') ? 'Start Game' : 'Join Game'
  // })

  state = {
    gameName: '',
    errorMessage: '',
    loading: false,
  };

  startOrJoinGame = async () => {
    const { gameName, loading } = this.state;

    if (loading) {
      return;
    }

    if (gameName.length === 0) {
      this.setState({ errorMessage: 'Please enter a game name' });
      return;
    }

    this.setState({ loading: true });
    let { navigation, setGameDoc, user } = this.props;
    const isUserStartingGame = this.props.navigation.getParam(
      'isUserStartingGame',
      false,
    );

    try {
      const gameDoc = await firestore
        .collection(COLLECTIONS.GAMES)
        .doc(gameName)
        .get();

      //starting game - name taken
      if (gameDoc.exists && isUserStartingGame) {
        this.setState({ loading: false, errorMessage: 'Game name taken' });
        return;
      }
      //joining game
      if (!isUserStartingGame) {
        //game dont exist
        if (!gameDoc.exists) {
          this.setState({
            loading: false,
            errorMessage: 'This game does not exist',
          });
          return;
        }
        //game has started
        if (gameDoc.exists && gameDoc.data().gameStarted) {
          this.setState({
            loading: false,
            errorMessage: 'This game has started',
          });
          return;
        }
      }

      if (isUserStartingGame) {
        await gameDoc.ref.set({
          gameName: gameName,
          timestamp: new Date(),
        });
      }
      setGameDoc(gameDoc);

      const playersColRef = gameDoc.ref.collection(COLLECTIONS.PLAYERS);

      await playersColRef.doc(user.email).set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        isAdmin: !!isUserStartingGame,
        photoURL: user.photoURL,
        stats: user.stats,
        votedFor: [],
      });

      const disconnectFromPlayerCollection = playersColRef.onSnapshot(
        querySnapshot => {
          console.log('players onSnapshot');
          const players = [];

          querySnapshot.forEach(playerDocument => {
            players.push(playerDocument.data());
          });

          this.props.updatePlayersData(players);
        },
      );

      this.props.setPlayersDisconnect(disconnectFromPlayerCollection);

      const disconnectFromGame = gameDoc.ref.onSnapshot(doc => {
        console.log('game onSnapshot');

        this.props.updateGameData(doc.data());
      });

      this.props.setGameDisconnect(disconnectFromGame);

      navigation.navigate('PreGame');
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false,
        errorMessage: 'not sure what went wrong',
      });
    }
  };

  render() {
    const { gameName, errorMessage, loading } = this.state;
    const setName = text => this.setState({ gameName: text });
    const isUserStartingGame = this.props.navigation.getParam(
      'isUserStartingGame',
    );

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
      <MafiaBackground>
        <KeyboardAvoidingView style={styles.page}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <PageTitle title={isUserStartingGame ? 'Start Game' : 'Join Game'}/>

              <Text size='xsmall' letterSpacing={1} style={{ marginBottom: 10, paddingLeft: 20, paddingRight: 20, width: '90%', textAlign: 'center' }}>
                {isUserStartingGame ? 'Please enter a unique game ID below which you will share with other players' : 'Please enter the game you wish to join'}
              </Text>

              <FloatingLabelInput
                autoFocus={true}
                label={`Enter game ID`}
                onChangeText={text => setName(text)}
                value={gameName}
                onSubmitEditing={this.startOrJoinGame}
                returnKeyType="go"
                autoCapitalize="none"
              />

              <ErrorMessage errorMessage={errorMessage} />

              <Button onPress={this.startOrJoinGame}>
                <Text>{isUserStartingGame ? 'Start' : 'Join'}</Text>
              </Button>
            </>
          )}
        </KeyboardAvoidingView>
      </MafiaBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateGameData: data => dispatch(updateGameData(data)),
  updatePlayersData: data => dispatch(updatePlayersData(data)),
  setGameDisconnect: gameDisconnect =>
    dispatch(setGameDisconnect(gameDisconnect)),
  setPlayersDisconnect: playersDisconnect =>
    dispatch(setPlayersDisconnect(playersDisconnect)),
  setGameDoc: doc => dispatch(setGameDocument(doc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartOrJoinGame);
