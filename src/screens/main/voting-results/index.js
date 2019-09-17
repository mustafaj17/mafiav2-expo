import React from 'react'
import { ScrollView, View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {generateSortedVotes, getHighestVotedPlayer, isGameOver} from "./utils";
import {firestore} from "../../../services/firebase";
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import PlayerVoteResult from '../../../components/playerVoteResult';

class VotingResults extends React.Component {

    shouldComponentUpdate(nextProps){

        const { gameData, navigation, gameDoc, inGamePlayers } = nextProps;

        const gameOver = isGameOver(inGamePlayers);

        if(gameData.inVote){
            gameDoc.ref.update( 'inVote', false);
            navigation.navigate('InVote');
            return false;
        }
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

    handleRevote = () => {
        const { inGamePlayers, gameDoc } = this.props;
        const batch = firestore.batch();

        inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: null});
        });
        batch.update(gameDoc.ref, {votingDraw: null, inVote: true});
        batch.commit().then( () => {
            console.log('re-vote update complete');
        }).catch( e => {
            console.log('error re-vote update: ', e );
        })
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

        const votingResults = generateSortedVotes(inGamePlayers);
        return votingResults.map( (result, index) => {
            return (<PlayerVoteResult
              key={result[0]}
              showVoters={index === 0}
              playerName={result[0]}
              votedForBy={result[1]}/>)
        })
    }

    render() {

        const { gameData, currentPlayer } = this.props;


        return (
          <View style={{...styles.page, justifyContent: 'space-between'}}>

              <Text type='bold' size='large'> VotingResults </Text>
              { gameData.votingDraw && <Text>Game was draw </Text> }

              <ScrollView style={{width: '100%', flex: 1}}>
                  <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      { this.getResults() }
                  </View>
              </ScrollView>

              { currentPlayer.isAdmin &&
              (gameData.votingDraw ?
                  <Button onPress={this.handleRevote} >
                      <Text>Re-vote</Text>
                  </Button> :
                  <Button onPress={this.handleNextRound} >
                      <Text>Next</Text>
                  </Button>
              ) }

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
