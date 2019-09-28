import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../../../styles/global';
import { generateSortedVotes } from '../voting-results/utils';
import { Player } from '../../../components/player';
import { getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted } from '../../../redux/selectors';
import { connect } from 'react-redux';
import GameScreenHOC from '../../../components/gameScreenHoc';
import { firestore } from '../../../services/firebase';
import Text from '../../../components/text';
import Button from '../../../components/button';
import TextBar from '../../../components/textBar';
import PageTitle from '../../../components/pageTitle';
import InfoText from '../../../components/infoBox';

class VotingDraw extends React.Component {

  handleRevote = () => {
    const { inGamePlayers, gameDoc,navigation } = this.props;
    const batch = firestore.batch();

    inGamePlayers.forEach(player => {
      batch.update(gameDoc.ref.collection('players').doc(player.email), {votingFor: null});
    });
    batch.commit().then( () => {
      navigation.navigate('InVote')
    }).catch( e => {
      console.log('error re-vote update: ', e );
    })
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
      const player = inGamePlayers.find( player => player.displayName === playerDisplayName);
      return (<Player player={player} showPlayerReady={false}/>)
    })
  }

  render() {

    const { currentPlayer } = this.props;

    return (
      <View style={{...styles.page}}>

        <PageTitle title='Voting Results '/>
        <InfoText>
          <Text>Game was a draw</Text>
        </InfoText>

        <ScrollView style={{ width: '100%', flex: 1 }}>
          {this.getPlayersWhoDrew()}
        </ScrollView>

        { currentPlayer.isAdmin &&
        <Button onPress={this.handleRevote} >
          <Text color='black'>Re-vote</Text>
        </Button>
        }
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(VotingDraw));
