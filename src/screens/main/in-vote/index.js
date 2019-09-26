import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../services/firebase'
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Button from '../../../components/button';
import Text from '../../../components/text';
import { Player } from '../../../components/player';
import AnimateLogo from '../../../components/amimatedLogo';

class InVote extends React.Component {

    state = {
        playerHasVoted : false
    }

    voteForPlayer = player => {
        const { gameDoc, currentPlayer, inGamePlayers } = this.props;
        gameDoc.ref.collection('players').doc(currentPlayer.email).update({votingFor: player, votedFor: [player.displayName, ...currentPlayer.votedFor]})
        this.setState({playerHasVoted: true})
    }

    shouldComponentUpdate= (nextProps) => {

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
            const currentTestPlayer = inGamePlayers.filter(p => p.email === player.email)
            const randomPlayer =  getRandomPlayer()
            batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: randomPlayer, votedFor: [randomPlayer.displayName, ...currentTestPlayer[0].votedFor]});
        });

        batch.commit().then( () => {
            console.log('automated voting complete');
        }).catch( e => {
            console.log('error completing autoVote: ', e );
        })
    }

    render() {

        const { inGamePlayers, currentPlayer } = this.props;
        const { playerHasVoted } = this.state;

        return (
          <View style={styles.page}>

              <View><Text type='bold'  style={{marginTop: 10}}>InVote</Text></View>

              {(!currentPlayer.isOut && !playerHasVoted) ?

                <ScrollView style={{ width: '100%' }}>

                    {inGamePlayers.filter(player => player.email !== currentPlayer.email).map(player => (
                      <TouchableOpacity key={player.uid}
                                        onPress={() => {
                                            this.voteForPlayer(player)
                                        }}>
                          <Player player={player} showTypes={false}/>
                      </TouchableOpacity>
                    ))}

                </ScrollView> :
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <AnimateLogo/>
                    <Text>Voting in progress...</Text>
                </View>
              }

              <Button onPress={this.testAutoVote}>
                  <Text color='black'>Auto-Vote</Text>
              </Button>

          </View>
        )
    }
}


const mapStateToProps = state => ({
    gameDoc: state.game.gameDoc,
    inGamePlayers: getInGamePlayers(state),
    allPlayersHaveVoted: haveAllPlayersVoted(state),
    currentPlayer: getCurrentPlayer(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(InVote));
