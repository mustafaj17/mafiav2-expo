import React from 'react'
import { View, Text} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import {generateSortedVotes, getHighestVotedPlayer} from "./utils";
import {firestore} from "../../../../services/firebase";
import {getInGamePlayers} from "../../../../redux/selectors/index";

class VotingResults extends React.Component {

    state = {
        loading: false
    }

    handleRevote = () => {
        const { inGamePlayers, navigation, gameDoc } = this.props;
        const batch = firestore.batch();

        this.setState({ loading: true});

        inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: null});
        });

        batch.commit().then( () => {
            console.log('re-vote update complete');
            navigation.navigate('InVote');
        }).catch( e => {
            console.log('error re-vote update: ', e );
        })
    }

    handleNextRound = () => {
        const { inGamePlayers, navigation, gameDoc } = this.props;
        const batch = firestore.batch();
        const playerVotedOut = getHighestVotedPlayer(inGamePlayers)
        this.setState({ loading: true});

        batch.update(gameDoc.ref, {votingDraw: null});
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

            if(gameOver){
                navigation.navigate('GameOver');
            }else{
                navigation.navigate('PreRound');
            }
        }).catch( e => {
            console.log('error completing voting: ', e );
        })
    }

    getResults = () => {
        const { players } = this.props;
        const { loading } = this.state;

        if( loading ) return <Text>Loading</Text>;

        const votingResults = generateSortedVotes(players);
        return (<View>
            {votingResults && votingResults.map( result => <View>
                <Text>
                    {result[0]} : {result[1]}
                </Text>
            </View>)}
        </View>)
    }

    render() {

        const { game } = this.props;


        return (
           <View style={styles.page}>

               <Text> VotingResults </Text>
               { game.votingDraw && <Text>Game was draw </Text> }

               { this.getResults() }

               { game.votingDraw ?
                   <Button onPress={this.handleRevote} title='Re-vote'/> :
                   <Button onPress={this.handleNextRound} title='Next'/>
               }

           </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data,
    players: state.game.playersData,
    game: state.game.gameData,
    inGamePlayers: getInGamePlayers(state),
    gameDoc: state.game.gameDoc
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VotingResults);
