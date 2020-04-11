import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {
  getCurrentPlayer,
  getInGamePlayers,
  haveAllPlayersVoted,
} from '../../../redux/selectors';
import GameScreenHOC from '../../../components/gameScreenHoc';
import PageTitle from '../../../components/pageTitle';
import Player from '../../../components/player/Player';
import { COLLECTIONS } from '../../../constants';
import Text from '../../../components/text';
import { firestore } from '../../../services/firebase';

class InVote extends React.Component {
  state = {
    playerHasVoted: false,
  };

  voteForPlayer = player => {
    const { gameDoc, currentPlayer, inGamePlayers } = this.props;
    gameDoc.ref
      .collection(COLLECTIONS.PLAYERS)
      .doc(currentPlayer.email)
      .update({ votingFor: player });
    this.setState({ playerHasVoted: true });
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const { allPlayersHaveVoted, inGamePlayers } = this.props;

    if (allPlayersHaveVoted) {
      this.handleVotingComplete(inGamePlayers);
    }
  }

  handleVotingComplete = inGamePlayers => {
    const { navigation } = this.props;

    const votingResults = inGamePlayers.reduce(function(map, player) {
      if (!(player.votingFor.email in map)) {
        map[player.votingFor.email] = 0;
      }
      map[player.votingFor.email]++;
      return map;
    }, {});

    const max = Math.max(...Object.values(votingResults));
    const highestVotedForPlayers = [];
    Object.keys(votingResults).forEach(player => {
      if (votingResults[player] === max) highestVotedForPlayers.push(player);
    });

    if (highestVotedForPlayers.length > 1) {
      navigation.navigate('VotingDraw');
    } else {
      navigation.navigate('VotingResults');
    }
  };


  // testAutoVote = () => {
  //   const { inGamePlayers, gameDoc } = this.props;
  //   const getRandomPlayer = () => {
  //     const randomNumber = Math.floor(Math.random() * inGamePlayers.length);
  //     return inGamePlayers[randomNumber];
  //   };
  //   const batch = firestore.batch();
  //   inGamePlayers.forEach(player => {
  //     const randomPlayer = getRandomPlayer();
  //     batch.update(
  //       gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(player.email),
  //       { votingFor: randomPlayer },
  //     );
  //   });
  //
  //   batch
  //     .commit()
  //     .then(() => {
  //       console.log('automated voting complete');
  //     })
  //     .catch(e => {
  //       console.log('error completing autoVote: ', e);
  //     });
  // };




  render() {
    const { inGamePlayers, currentPlayer } = this.props;
    const { playerHasVoted } = this.state;
    const votablePlayers = inGamePlayers.filter(
      player => player.uid !== currentPlayer.uid,
    );

    return (
      <View style={styles.page}>
        <PageTitle title="VOTING" />
        {playerHasVoted || currentPlayer.isOut ? (
          <>
            <Text size='small'
                  type='light'
                  letterSpacing={1}
                  style={{
                    textAlign: 'center',
                    margin: 20,
                    marginTop: 10
                  }}>
              Waiting for others to vote...
            </Text>
            <ScrollView style={{ width: '100%', flex: 1 }}>
              {inGamePlayers.map(player => (
                  <Player
                    key={player.uid}
                    player={player}
                    subText={player.votingFor ? 'voted' : 'waiting...'}
                    greenSubText={player.votingFor}
                  />
              ))}
            </ScrollView>
          </>
        ) : (
          <>

            <Text size='small'
                  type='light'
                  letterSpacing={1}
                  style={{
                    textAlign: 'center',
                    margin: 20,
                    marginTop: 10
                  }}>
              Vote for the person you think is Mafia
            </Text>

            <ScrollView style={{ width: '100%', flex: 1 }}>
              {votablePlayers.map(player => (
                <TouchableOpacity
                  onPress={() => this.voteForPlayer(player)}
                  key={player.uid}>
                  <Player
                    player={player}
                    subText="Tap to vote"
                    greenSubText={true}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
        {/*<TouchableOpacity*/}
          {/*onPress={this.testAutoVote}*/}
          {/*style={{*/}
            {/*position: 'absolute',*/}
            {/*bottom: 100,*/}
            {/*left: 10,*/}
            {/*width: 50,*/}
            {/*height: 50,*/}
            {/*borderRadius: 25,*/}
            {/*backgroundColor: 'pink',*/}
            {/*display: 'flex',*/}
            {/*justifyContent: 'center',*/}
            {/*alignItems: 'center',*/}
          {/*}}>*/}
          {/*<Text size="xxsmall">Auto vote</Text>*/}
        {/*</TouchableOpacity>*/}


      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameDoc: state.game.gameDoc,
  inGamePlayers: getInGamePlayers(state),
  allPlayersHaveVoted: haveAllPlayersVoted(state),
  currentPlayer: getCurrentPlayer(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(InVote));

