import React from 'react'
import { View, Text} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import {generateSortedVotes, getHighestVotedPlayer, isGameOver} from "./utils";
import {firestore} from "../../../../services/firebase";
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../../redux/selectors/index";

class VotingResults extends React.Component {

    componentDidUpdate(){

        const { gameData, navigation, gameDoc, inGamePlayers } = this.props;

        const gameOver = isGameOver(inGamePlayers);

        if(gameData.revoteStarted){
            gameDoc.ref.update( 'revoteStarted', false);
            navigation.navigate('InVote');
            return null;
        }
        if(gameData.votingComplete) {
            gameDoc.ref.update( 'votingComplete', false);
            if (gameOver) {
                navigation.navigate('GameOver');
            } else {
                navigation.navigate('PreRound');
            }
        }
    }

    handleRevote = () => {
        const { inGamePlayers, gameDoc } = this.props;
        const batch = firestore.batch();

        inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: null});
        });
        batch.update(gameDoc.ref, {votingDraw: null, revoteStarted: true});
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

        if( !allPlayersHaveVoted ) return <Text>Loading</Text>;

        const votingResults = generateSortedVotes(inGamePlayers);
        return (<View>
            {votingResults && votingResults.map( result => <View>
                <Text>
                    {result[0]} : {result[1]}
                </Text>
            </View>)}
        </View>)
    }

    render() {

        const { gameData, currentPlayer } = this.props;


        return (
           <View style={styles.page}>

               <Text> VotingResults </Text>
               { gameData.votingDraw && <Text>Game was draw </Text> }

               { this.getResults() }

               { currentPlayer.isAdmin &&
               (gameData.votingDraw ?
                   <Button onPress={this.handleRevote} title='Re-vote'/> :
                   <Button onPress={this.handleNextRound} title='Next'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(VotingResults);
