import React from 'react';
import { firestore } from '../../services/firebase';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { endGame } from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { COLLECTIONS } from '../../constants';
import { YesNoModal } from '../YesNoModal';

class LeaveGameModal extends React.Component {
  handlePlayerLeaving = async () => {
    const {
      navigation,
      game,
      currentPlayer,
      gameDoc,
      inGamePlayers,
      players,
      endGameAction,
      visible,
      hideModal
    } = this.props;
    const batch = firestore.batch();

    //
    game.playersDisconnect();
    game.gameDisconnect();

    // only admin in the game so lets delete the game doc aswel
    if (players.length === 1) {
      const playerDocRef = await gameDoc.ref
        .collection(COLLECTIONS.PLAYERS)
        .doc(currentPlayer.email);
      batch.delete(playerDocRef);
      batch.delete(gameDoc.ref);
    }
    //more then one player so set new admin
    else if (currentPlayer.isAdmin) {
      const newAdmin = inGamePlayers.find(
        player => player.email !== currentPlayer.email,
      );
      batch.update(
        gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(newAdmin.email),
        { isAdmin: true },
      );
      batch.update(
        gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(currentPlayer.email),
        { leftGame: true },
      );
    }else{
      batch.update(
        gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(currentPlayer.email),
        { leftGame: true },
      );
    }

    endGameAction();
    navigation.navigate('Lobby');
    await this.updateUserStats();
    await batch.commit();
  };

  updateUserStats = async () => {
    const { currentPlayer } = this.props;

    await firestore
      .collection(COLLECTIONS.STATS)
      .doc(currentPlayer.email)
      .update({
        ...currentPlayer.stats,
        gamesPlayed: currentPlayer.stats.gamesPlayed + 1,
        gamesLeft: currentPlayer.stats.gamesLeft + 1,
      });
  };

  render() {

    const {
      visible,
      hideModal
    } = this.props;

    return(
      <YesNoModal
        visible={visible}
        closeModal={hideModal}
        onConfirm={this.handlePlayerLeaving}
        question='Are you sure you want to leave?'
      />
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
});

const mapDispatchToProps = dispatch => ({
  endGameAction: () => dispatch(endGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(LeaveGameModal));
