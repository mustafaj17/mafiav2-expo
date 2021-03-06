import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {
  generateSortedVotes,
  getHighestVotedPlayer,
  isGameOver,
  getPlayersWhoVotedFor,
} from './utils';
import { firestore } from '../../../services/firebase';
import {
  getCurrentPlayer,
  getInGamePlayers,
  haveAllPlayersVoted,
} from '../../../redux/selectors';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Text from '../../../components/text';
import Button from '../../../components/button';
import ProfilePicture from '../../../components/profilePicture';
import PlayerOut from '../../../components/playerOut';
import PageTitle from '../../../components/pageTitle';
import { COLLECTIONS } from '../../../constants';
import LoadingScreen from '../../../components/loadingScreen';

class VotingResults extends React.Component {


  shouldComponentUpdate = async nextProps => {
    const { gameData, navigation, gameDoc, inGamePlayers } = nextProps;

    const gameOver = isGameOver(inGamePlayers);

    if (gameData.votingComplete) {
      await gameDoc.ref.update('votingComplete', false);
      if (gameOver) {
        navigation.navigate('GameOver');
      } else {
        navigation.navigate('PreRound');
      }
      return false;
    }

    return true;
  };

  componentWillMount() {

    const { inGamePlayers, currentPlayer } = this.props;

    const votedOutPlayerResult = generateSortedVotes(inGamePlayers)[0];
    const player = inGamePlayers.find(
      player => player.email === votedOutPlayerResult[0],
    );


    //if the voted out player leaves during voting this will prevent an error
    if(!player && currentPlayer.isAdmin){
      this.handleNextRound();
    }

    this.setState({
      votedOutPlayer: player,
    });
  }

  handleNextRound = () => {
    const { inGamePlayers, gameDoc } = this.props;
    const batch = firestore.batch();
    const playerVotedOut = getHighestVotedPlayer(inGamePlayers);
    batch.update(gameDoc.ref, { votingComplete: true });
    inGamePlayers.forEach(player => {
      batch.update(
        gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(player.email),
        {
          votingFor: null,
          votedFor: [...player.votedFor, player.votingFor.email],
          ready: false,
          isOut: player.email === playerVotedOut,
        },
      );
    });
    batch
      .commit()
      .then(() => {
        console.log('voting complete');
      })
      .catch(e => {
        console.log('error completing voting: ', e);
      });
  };

  getPlayersWhoVotedForCurrentPlayer = () => {
    const { inGamePlayers, allPlayersHaveVoted, currentPlayer } = this.props;

    if (!allPlayersHaveVoted) return null;

    const voters = getPlayersWhoVotedFor(currentPlayer, inGamePlayers);
    if (voters.length === 0) {
      return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Text>No one voted for you</Text>
        </View>
      );
    }

    return voters.map(player => (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 100,
          marginRight: 10,
          borderRadius: 4,
          borderColor: '#c1c1c1',
          borderWidth: 1,
          backgroundColor: 'white',
          padding: 5,
        }}>
        <ProfilePicture imageUri={player.photoURL} size={50} />
        <Text type="light">{player.displayName}</Text>
      </View>
    ));
  };

  render() {
    const { currentPlayer } = this.props;
    const { votedOutPlayer } = this.state;

    if(!votedOutPlayer){
      return(<LoadingScreen/>)
    }

    return (
      <View style={{ ...styles.page }}>
        <PageTitle title="VOTING RESULTS" />

        <View
          style={{
            display: 'flex',
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PlayerOut player={votedOutPlayer} />
        </View>

        {currentPlayer.isAdmin ? (
          <Button onPress={this.handleNextRound}>
            <Text>Next</Text>
          </Button>
        ) :
        <Text style={{marginBottom: 20}}>Waiting for admin...</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentPlayer: getCurrentPlayer(state),
  gameData: state.game.gameData,
  inGamePlayers: getInGamePlayers(state),
  gameDoc: state.game.gameDoc,
  allPlayersHaveVoted: haveAllPlayersVoted(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(VotingResults, true));
