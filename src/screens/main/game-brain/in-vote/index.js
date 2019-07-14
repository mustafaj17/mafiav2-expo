import React from 'react'
import {View, Text, ScrollView, FlatList, Button} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../../services/firebase'
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../../redux/selectors/index";


class InVote extends React.Component {

    voteForPlayer = player => {
        const { gameDoc, currentPlayer } = this.props;
        gameDoc.ref.collection('players').doc(currentPlayer.email).update({votingFor: player})
    }

    shouldComponentUpdate(nextProps) {

        const { allPlayersHaveVoted, inGamePlayers } = nextProps;

        if(allPlayersHaveVoted){
            this.handleVotingComplete(inGamePlayers);
            return false;
        }


        return true;
    }

    handleVotingComplete = (inGamePlayers) => {

        const { navigation, gameDoc } = this.props;

        const votingResults =  inGamePlayers.reduce(function(map, player){
            if(!(player.votingFor.displayName in map)) {
                map[player.votingFor.displayName] = 0;
            }
            map[player.votingFor.displayName]++;
            return map;
        }, {});

        const max = Math.max(...Object.values(votingResults));
        const highestVotedForPlayers = [];
        Object.keys(votingResults).forEach( player => {
            if(votingResults[player] === max) highestVotedForPlayers.push(player);
        });

        if(highestVotedForPlayers.length > 1){
            gameDoc.ref.update({ votingDraw: true })
        }

        navigation.navigate('VotingResults');
    }

    testAutoVote = () => {
        const { inGamePlayers, gameDoc } = this.props;
        const getRandomPlayer = ()=>{
            const randomNumber = Math.floor(Math.random() * inGamePlayers.length)
            return inGamePlayers[randomNumber]
        }
        const batch = firestore.batch();
        inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: getRandomPlayer()});
        });

        batch.commit().then( () => {
            console.log('automated voting complete');
        }).catch( e => {
            console.log('error completing autoVote: ', e );
        })
    }

    render() {

        const { inGamePlayers } = this.props;

        return (
            <View style={styles.page}>

                <Text> InVote </Text>
                <Button onPress={this.testAutoVote} title={'Auto-Vote'}/>
                <ScrollView>
                    <FlatList
                        data={inGamePlayers}
                        renderItem={(player) => {
                            return (
                                <Button
                                    title={player.item.displayName}
                                    onPress={ () => { this.voteForPlayer(player.item)}}
                                />)
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data,
    gameDoc: state.game.gameDoc,
    inGamePlayers: getInGamePlayers(state),
    allPlayersHaveVoted: haveAllPlayersVoted(state),
    currentPlayer: getCurrentPlayer(state),
    gameRound: state.game.round

})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InVote);
