import React from 'react';
import { Modal, View } from 'react-native';
import Text from '../text';
import Button from '../button';
import { firestore } from '../../services/firebase';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { endGame } from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { COLLECTIONS } from '../../constants';


class LeaveGameModal extends React.Component {

  handlePlayerLeaving =  async () => {

    const { navigation, game, currentPlayer, gameDoc, inGamePlayers, players, endGame } = this.props;
    const batch = firestore.batch();

    //
    game.playersDisconnect();
    game.gameDisconnect();

    // only admin in the game so lets delete the game doc aswel
    if(players.length === 1){
      const playerDocRef = await gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(currentPlayer.email);
      batch.delete(playerDocRef)
      batch.delete(gameDoc.ref);
    }
    //more then one player so set new admin
    else if(currentPlayer.isAdmin){
      const newAdmin = inGamePlayers.find( player => player.email !== currentPlayer.email)
      batch.update(gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(newAdmin.email), {isAdmin: true});
      batch.update(gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(currentPlayer.email), {leftGame: true});
    }

    endGame();
    navigation.navigate('Lobby');
    await this.updateUserStats();
    await batch.commit();

  }

  updateUserStats = async () => {
    const { currentPlayer} = this.props;

    await firestore.collection(COLLECTIONS.STATS
    ).doc(currentPlayer.email).update({
      ...currentPlayer.stats,
      gamesPlayed : currentPlayer.stats.gamesPlayed + 1,
      gamesLeft: currentPlayer.stats.gamesLeft + 1
    });
  }


  render() {
    return (
      <Modal onRequestClose={this.hideModal} animationType="slide" transparent={true}>
        <View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: '80%',
            height: '80%',
            padding: 20,
            borderRadius: 4,
            backgroundColor: 'red',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{marginBottom: 10}}>Are you sure you want to leave?</Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center' }}>

              <Button onPress={this.handlePlayerLeaving}
                      style={{ width: 120}}>
                <Text >Yes</Text>
              </Button>

              <Button onPress={this.props.hideModal}
                      style={{ width: 120}}>
                <Text >No</Text>
              </Button>

            </View>
          </View>
        </View>
      </Modal>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LeaveGameModal))
