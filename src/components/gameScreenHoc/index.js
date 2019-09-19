import React from "react";
import {BackHandler, ToastAndroid, View, Modal, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { firestore } from '../../services/firebase';
import Text from '../text';
import Button from '../button';


export default (WrappedComponent, hideCloseButton) => {
  class HOC extends React.Component {

    state = {
      showModal: false
    }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
      ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
      return true;
    }

    showModal = () => {
      this.setState( {
        showModal: true
      })
    }

    hideModal = () => {
      this.setState( {
        showModal: false
      })
    }

    handlePlayerLeaving =  async () => {

      const { navigation, game, currentPlayer, gameDoc, inGamePlayers, players } = this.props;
      const batch = firestore.batch();

      //todo: maybe add flag to say he left and in the end game summary we can show that he left
      //todo: also check if he was in the game so we can say 'voted and left'
      batch.update(gameDoc.ref.collection('players').doc(currentPlayer.email), {isOut: true});
      //
      game.playersDisconnect();
      game.gameDisconnect();

      // only admin in the game so lets delete the game doc aswel
      if(players.length === 1){
        const playerDocRef = await gameDoc.ref.collection('players').doc(currentPlayer.email);
        batch.delete(playerDocRef)
        batch.delete(gameDoc.ref);
      }
      //more then one player so set new admin
      else if(currentPlayer.isAdmin){
        const newAdmin = inGamePlayers.find( player => player.email !== currentPlayer.email)
        batch.update(gameDoc.ref.collection('players').doc(newAdmin.email), {isAdmin: true});
      }

      navigation.navigate('Lobby');
      await batch.commit();

    }

    render() {
      return (
        <View style={{ flex: 1}}>

          {!hideCloseButton &&
          <TouchableOpacity onPress={this.showModal} style={{ position: 'absolute' , top: 0, right: 10, zIndex: 10}}>
            <Ionicons name="md-close" size={32} color="black" />
          </TouchableOpacity>}

          {/*<Button title='Leave game' />*/}
          {this.state.showModal &&
          <Modal onRequestClose={this.hideModal} animationType='fade'>
            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text>Are you sure you want to leave?</Text>
              <Button onPress={this.handlePlayerLeaving}>
                <Text>Yes</Text>
              </Button>
              <Button onPress={this.hideModal}>
                <Text>No</Text>
              </Button>
            </View>
          </Modal>}
          <WrappedComponent {...this.props} />
        </View>
      )
    }
  }

  const mapStateToProps = state => ({
    players: state.game.playersData,
    gameDoc: state.game.gameDoc,
    game: state.game,
    inGamePlayers: getInGamePlayers(state),
    currentPlayer: getCurrentPlayer(state),
  })

  const mapDispatchToProps = dispatch => ({

  })

  return connect(mapStateToProps,mapDispatchToProps)(HOC);

}

