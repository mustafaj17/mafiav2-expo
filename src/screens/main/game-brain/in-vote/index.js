import React from 'react'
import {View, Text, BackHandler, ToastAndroid, ScrollView, FlatList,} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

class InVote extends React.Component {
    static navigationOptions = { header: null }

    screenWillFocus= () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    screenWillBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    voteForPlayer = player => {
        const { gameDoc } = this.props;
        //TODO: add needed data to VotingFor
        gameDoc.ref.collections('players').doc(currentPlayer.email).update({votingFor: player.displayName})
    }

    handleVotingComplete = () => {

        const { inGamePlayers } = this.props;
        const votingResults =  inGamePlayers.reduce(function(map, player){
            if(!(player.displayName in map)) {
                map[player.displayName] = 1;
            }else{
                map[player.displayName]++;
            }
            return map;
        }, {});

        const max = Math.max(Object.values(votingResults));
        const highestVotedForPlayers = [];
        Object.keys(votingResults).forEach( player => {
            if(votingResults[player] === max) highestVotedForPlayers.push(player);
        });

        if(highestVotedForPlayers.length > 1){
            //DRAW

        } else {
            //END VOTES
        }
    }

    render() {

        const { players, allPlayersHaveVoted } = this.props;

        if(allPlayersHaveVoted && currentPlayer.isAdmin){
            this.handleVotingComplete();
        }

        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />

               <Text> InVote </Text>

               <ScrollView>
                   <FlatList
                      data={players}
                      renderItem={({player}) =>
                         <Button title={player.displayName} onPress={ () => {
                             this.voteForPlayer(player)}
                         }/>
                      }
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
    inGamePlayers: state.game.playersData.filter( player => !player.isOut)
    allPlayersHaveVoted: state.game.playersData.filter( player => !player.isOut).reduce( (allVoted ,player) => (allReady && !!player.votedFor), true),
    currentPlayer: state.game.playersData.find( player => player.displayName === state.user.data.displayName),

})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InVote);