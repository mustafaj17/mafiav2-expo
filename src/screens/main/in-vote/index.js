import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../services/firebase'
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Button from '../../../components/button';
import Text from '../../../components/text';
import PageTitle from '../../../components/pageTitle';
import AnimateLogo from '../../../components/amimatedLogo';
import Player from '../../../components/player/Player';

class InVote extends React.Component {

  state = {
    playerHasVoted : false,
    activeSlide: 0
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

    const { navigation } = this.props;

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
      navigation.navigate('VotingDraw');
    }else{
      navigation.navigate('VotingResults');
    }

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
    const votablePlayers = inGamePlayers.filter(player => player.uid !== currentPlayer.uid);

    return (
      <View style={styles.page}>
        {playerHasVoted || currentPlayer.isOut ?
          <>
            <AnimateLogo/>
            <Text>Voting in progress...</Text>
          </>
          :
          <>
            <PageTitle title='Please Vote'/>

            <ScrollView style={{width: '100%', flex: 1}}>
              {votablePlayers.map( player => (
                <TouchableOpacity onPress={() => this.voteForPlayer(player)}>
                  <Player player={player} >
                    <View style={{marginLeft: 'auto', marginRight: 10}}>
                      <Text size='small' type='light'>Tap to vote</Text>
                    </View>
                  </Player>
                </TouchableOpacity>))}
            </ScrollView>
          </>}

        <TouchableOpacity onPress={this.testAutoVote}
                          style={{position: 'absolute', bottom: 100, left: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'pink',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text size='xsmall'>Auto vote</Text>
        </TouchableOpacity>
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
