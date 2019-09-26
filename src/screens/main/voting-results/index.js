import React from 'react'
import { ScrollView, View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {generateSortedVotes, getHighestVotedPlayer, isGameOver, getPlayersWhoVotedFor} from "./utils";
import {firestore} from "../../../services/firebase";
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';
import ProfilePicture from '../../../components/profilePicture';

class VotingResults extends React.Component {

    shouldComponentUpdate = (nextProps) => {

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
            batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: null, votedFor: [...player.votedFor.splice(0, 1)]});
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

        const votedOutPlayerResult = generateSortedVotes(inGamePlayers)[0];
        const player = inGamePlayers.find(player => player.displayName === votedOutPlayerResult[0]);
        const votedForBy = votedOutPlayerResult[1];

        return (
          <View style={{ display: 'flex', justifyContent: 'center'}}>
              <Text>{player.displayName} is out</Text>
              <Text>They was a {player.type} </Text>
              <Text>Voted by</Text>
              <ScrollView style={{width: '100%'}}>
                  {votedForBy.map( player => {
                      const photoUrl = inGamePlayers.find( p => p.displayName === player).photoURL;
                      return(
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row' }}>
                            <ProfilePicture imageUri={photoUrl} size={50}/>
                            <Text>{player}</Text>
                        </View>
                      )}
                  )}
              </ScrollView>
          </View>
        )

    }

    getPlayersWhoVotedForCurrentPlayer = () => {
        const { inGamePlayers, allPlayersHaveVoted, currentPlayer } = this.props;

        if( !allPlayersHaveVoted ) return null;

        const voters = getPlayersWhoVotedFor(currentPlayer, inGamePlayers);
        console.log(voters);
        if(voters.length === 0 ) {
            return (
              <View>
                  <Text>No one voted for you</Text>
              </View>
            )}

        return voters.map( player =>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <ProfilePicture imageUri={player.photoURL} size={50}/>
              <Text style={{marginLeft: 10}}>{player.displayName}</Text>
          </View>)
    }


    getPlayersWhoDrew = () => {
        const { inGamePlayers, allPlayersHaveVoted } = this.props;

        if( !allPlayersHaveVoted ) return null;

        const votingResults = generateSortedVotes(inGamePlayers);
        const playersWhoDrew = votingResults.reduce( (result , voteResult) => {
            if(!result.length){
                result.push(voteResult);
                return result
            }

            if(result[0][1].length === voteResult[1].length){
                result.push(voteResult);
                return result
            };

            return result;
        }, []);

        return playersWhoDrew.map( (result, index) => {
            const playerDisplayName = result[0];
            const playerProfilePicUrl = inGamePlayers.find( player => player.displayName === playerDisplayName).photoURL;
            return (
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%', flexDirection: 'row' }}>
                  <ProfilePicture imageUri={playerProfilePicUrl} size={50}/>
                  <Text style={{marginLeft: 10}}>{playerDisplayName}</Text>
              </View>)
        })
    }

    render() {

        const { gameData, currentPlayer } = this.props;


        return (
          <View style={{...styles.page, justifyContent: 'space-between'}}>

              <Text type='bold' size='large'> Voting Results </Text>
              {gameData.votingDraw ?
                <>
                    <Text type='bold' style={{ marginBottom: 10, marginTop: 10 }}>
                        Game was a draw
                    </Text>

                    <ScrollView style={{ width: '100%', flex: 1 }}>
                        {this.getPlayersWhoDrew()}
                    </ScrollView>

                    { currentPlayer.isAdmin &&
                    <Button onPress={this.handleRevote} >
                        <Text color='black'>Re-vote</Text>
                    </Button>
                    }
                </> :

                <>
                    <View style={{ width: '100%', flex: 1 }}>
                        {this.getResults()}
                    </View>

                    <View
                      style={{width: '100%', height: 70, padding: 10, backgroundColor: 'red'}}

                    >

                    <ScrollView
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                    >

                        {this.getPlayersWhoVotedForCurrentPlayer()}

                    </ScrollView>

                    </View>
                    { currentPlayer.isAdmin &&
                    <Button onPress={this.handleNextRound} >
                        <Text color='black'>Next</Text>
                    </Button>
                    }
                </>
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
