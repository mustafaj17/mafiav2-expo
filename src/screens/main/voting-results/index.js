import React from 'react'
import { Image, ScrollView, View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {generateSortedVotes, getHighestVotedPlayer, isGameOver, getPlayersWhoVotedFor} from "./utils";
import {firestore} from "../../../services/firebase";
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import ProfilePicture from '../../../components/profilePicture';
import TextBar from '../../../components/textBar';
import PlayerOut from '../../../components/playerOut';
import PageTitle from '../../../components/pageTitle';
import InfoText from '../../../components/infoBox';


class VotingResults extends React.Component {

  shouldComponentUpdate = (nextProps) => {

    const { gameData, navigation, gameDoc, inGamePlayers } = nextProps;

    const gameOver = isGameOver(inGamePlayers);

    if(gameData.votingComplete) {
      gameDoc.ref.update( 'votingComplete', false);
      if (gameOver) {
        navigation.navigate('GameOver');
      } else {
        navigation.navigate('PreRound');
      }
      return false
    }

    return true;
  }


  handleNextRound = () => {
    const { inGamePlayers, gameDoc } = this.props;
    const batch = firestore.batch();
    const playerVotedOut = getHighestVotedPlayer(inGamePlayers);
    batch.update(gameDoc.ref, {votingComplete: true});
    inGamePlayers.forEach(player => {
      batch.update(gameDoc.ref.collection('players').doc(player.email),
        {
          votingFor: null,
          votedFor: [...player.votedFor, player.votingFor.displayName],
          ready: false,
          isOut: (player.email === playerVotedOut)
        });
    });
    batch.commit().then( () => {
      console.log('voting complete');

    }).catch( e => {
      console.log('error completing voting: ', e );
    })
  }

  getResults = () => {
    const { inGamePlayers, allPlayersHaveVoted } = this.props;

    if( !allPlayersHaveVoted ) return null;

    const votedOutPlayerResult = generateSortedVotes(inGamePlayers)[0];
    const player = inGamePlayers.find(player => player.displayName === votedOutPlayerResult[0]);
    const votedForBy = votedOutPlayerResult[1];

    return (
      <View style={{display: 'flex', flex: 1}}>
        <PlayerOut player={player}/>
      </View>
    )

  }

  getPlayersWhoVotedForCurrentPlayer = () => {
    const { inGamePlayers, allPlayersHaveVoted, currentPlayer } = this.props;

    if( !allPlayersHaveVoted ) return null;

    const voters = getPlayersWhoVotedFor(currentPlayer, inGamePlayers);
    if(voters.length === 0 ) {
      return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text>No one voted for you</Text>
        </View>
      )}

    return voters.map( player =>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 100, marginRight: 10}}>
        <ProfilePicture imageUri={player.photoURL} size={50}/>
        <Text>{player.displayName}</Text>
      </View>)
  }


  render() {

    const { gameData, currentPlayer } = this.props;


    return (
      <View style={{...styles.page}}>

        <PageTitle title='Voting Results'/>

        <View style={{ width: '100%', flex: 1 }}>
          {this.getResults()}
        </View>


        {!currentPlayer.isOut &&
        <View style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          marginBottom: 10
        }}>

          <TextBar title="You're voters"/>

          <ScrollView
            style={{
              padding: 10,
              width: '100%',
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            {this.getPlayersWhoVotedForCurrentPlayer()}
          </ScrollView>

        </View>
        }

        { currentPlayer.isAdmin &&
        <Button onPress={this.handleNextRound} >
          <Text color='black'>Next</Text>
        </Button>
        }

      </View>
    )
  }
}


const mapStateToProps = state => ({
  currentPlayer: getCurrentPlayer(state),
  gameData: state.game.gameData,
  inGamePlayers: getInGamePlayers(state),
  gameDoc: state.game.gameDoc,
  allPlayersHaveVoted: haveAllPlayersVoted(state),
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(VotingResults));
