import React from 'react'
import { View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { firestore } from '../../../services/firebase'
import {getCurrentPlayer, getInGamePlayers, haveAllPlayersVoted} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import ProfilePicture from '../../../components/profilePicture';
import Carousel, { Pagination }  from 'react-native-snap-carousel';
import { Dimensions } from "react-native";
import Button from '../../../components/button';
import Text from '../../../components/text';
import TextBar from '../../../components/textBar';
import PageTitle from '../../../components/pageTitle';
import { LinearGradient } from 'expo-linear-gradient';
import AnimateLogo from '../../../components/amimatedLogo';
import InfoText from '../../../components/infoBox';

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

  renderPlayer = (data, index) => {

    const player = data.item;
    return (
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        borderRadius: 50
      }}>

        <ProfilePicture imageUri={player.photoURL}/>
        <Text style={{marginTop: 20, marginBottom: 10}}>{player.displayName}</Text>
        <Button
          // style={{backgroundColor: 'none', borderWidth: 1,borderColor: 'white', elevation: 0}}
          onPress={() => this.voteForPlayer(player)}>
          <Text color='black'>Vote</Text>
        </Button>
      </View>
    )
  }

  render() {

    const { inGamePlayers, currentPlayer } = this.props;
    const { activeSlide } = this.state;
    const { playerHasVoted } = this.state;
    const screenWidth = Dimensions.get('window').width;
    const votablePlayers = inGamePlayers.filter(player => player.uid !== currentPlayer.uid);

    return (
      <View style={styles.page}>
        {playerHasVoted ?
          <>
          <AnimateLogo/>
          <Text>Voting in progress...</Text>
          </>
          :
          <>
            <PageTitle title='Please Vote'/>


            <InfoText>
              <Text>{`Player ${activeSlide + 1} of ${votablePlayers.length}`}</Text>
            </InfoText>

            <Carousel
              ref={(c) => { this._carousel = c; }}
              layout={'stack'}
              layoutCardOffset={screenWidth - 120}
              data={votablePlayers}
              renderItem={this.renderPlayer}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 20}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />


          </>}
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
