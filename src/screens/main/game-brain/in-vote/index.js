import React from 'react'
import {View, Text, ScrollView, FlatList, Button} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../../services/firebase'


class InVote extends React.Component {

    voteForPlayer = player => {
        const { gameDoc, currentPlayer } = this.props;
        gameDoc.ref.collection('players').doc(currentPlayer.email).update({votingFor: player})
    }

    componentDidUpdate() {

        const { allPlayersHaveVoted } = this.props;

        if(allPlayersHaveVoted){
            this.handleVotingComplete();
        }
    }

    handleVotingComplete = () => {

        const { inGamePlayers, gameRound, gameDoc } = this.props;

        const votingResults =  inGamePlayers.reduce(function(map, player){
            if(!(player.displayName in map)) {
                map[player.displayName] = 1;
            }else{
                map[player.displayName]++;
            }
            return map;
        }, {});

        const max = Math.max(...Object.values(votingResults));
        const highestVotedForPlayers = [];
        Object.keys(votingResults).forEach( player => {
            if(votingResults[player] === max) highestVotedForPlayers.push(player);
        });

        if(highestVotedForPlayers.length > 1){
            gameDoc.ref.update({ votingDraw: true, playersDrawn : highestVotedForPlayers})
        }

        this.props.navigation.navigate('VotingResults');
    }

    testAutoVote = () => {
        const { inGamePlayers, gameDoc } = this.props;
        const getRandomPlayer = ()=>{
            const randomNumber = Math.floor(Math.random() * inGamePlayers.length)
            return inGamePlayers[randomNumber].displayName
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

        const { players } = this.props;

        return (
           <View style={styles.page}>

               <Text> InVote </Text>
                <Button onPress={this.testAutoVote} title={'Auto-Vote'}/>
               <ScrollView>
                   <FlatList
                      data={players}
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
    players: state.game.playersData,
    inGamePlayers: state.game.playersData.filter( player => !player.isOut),
    allPlayersHaveVoted: state.game.playersData.filter( player => !player.isOut).reduce( (allVoted ,player) => (allVoted && !!player.votingFor), true),
    currentPlayer: state.game.playersData.find( player => player.displayName === state.user.data.displayName),
    gameRound: state.game.round

})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InVote);