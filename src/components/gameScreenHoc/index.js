import React from "react";
import {BackHandler, ToastAndroid, View, Modal, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { firestore } from '../../services/firebase';
import Text from '../text';
import Button from '../button';
import MafiaBackground from '../mafiaBackground';
import { endGame } from '../../redux/actions/gameActions';
import PlayerInfoModal from '../playerInfoModal';


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

      const { navigation, game, currentPlayer, gameDoc, inGamePlayers, players, endGame } = this.props;
      const batch = firestore.batch();

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
        batch.update(gameDoc.ref.collection('players').doc(currentPlayer.email), {leftGame: true});
        this.updateUserStats();
      }

      endGame();
      navigation.navigate('Lobby');
      await batch.commit();

    }

    updateUserStats = async () => {
      await firestore.collection('user-stats').doc(currentPlayer.email).update({
        ...stats,
        gamesPlayed : stats.gamesPlayed + 1,
        gamesLeft: stats.gamesLeft + 1
      });
    }

    render() {
      return (
        <View style={{ flex: 1}}>

          {!hideCloseButton &&
          <TouchableOpacity onPress={this.showModal} style={{ position: 'absolute' , top: 5, right: 10, zIndex: 2}}>
            <Ionicons name="md-close" size={32} color="black" />
          </TouchableOpacity>}

          {/*<Button title='Leave game' />*/}
          {this.state.showModal &&
          <Modal onRequestClose={this.hideModal} animationType='fade'>
            <MafiaBackground>
              <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 10}}>Are you sure you want to leave?</Text>
                <View style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center' }}>

                  <Button onPress={this.handlePlayerLeaving}
                          style={{ width: 120}}>
                    <Text color='black'>Yes</Text>
                  </Button>

                  <Button onPress={this.hideModal}
                          style={{ width: 120}}>
                    <Text color='black'>No</Text>
                  </Button>

                </View>
              </View>
            </MafiaBackground>
          </Modal>}
          <MafiaBackground>
            <WrappedComponent {...this.props} />
          </MafiaBackground>

          <PlayerInfoModal/>

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
    stats: state.user.stats,
  })


  const mapDispatchToProps = dispatch => ({
    endGame : () => dispatch(endGame())
  })

  return connect(mapStateToProps,mapDispatchToProps)(HOC);

}

