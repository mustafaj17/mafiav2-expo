import React from 'react'
import { View, ScrollView } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import ReadyButton from '../../../components/playerReadyButton';
import {areAllPlayersReady, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import {firestore} from "../../../services/firebase";
import { toggleDisplayPlayerTypes } from '../../../redux/actions/gameActions';
import GameScreenHOC from "../../../components/gameScreenHoc";
import Player from '../../../components/player';
import Text from '../../../components/text';
import Button from '../../../components/button';

class PreRound extends React.Component {

  shouldComponentUpdate(nextProps){
    const { navigation, allPlayersAreReady } = nextProps;

    if(allPlayersAreReady) {
      navigation.navigate('InRound');
      return false;
    }

    return true;
  }

  render() {

    const { gameData, currentPlayer, inGamePlayers, gameDoc, toggleDisplayPlayerTypes } = this.props;

    return (
      <View style={styles.page}>

        <View><Text type='bold'>{gameData.gameName}</Text></View>

        <ScrollView style={{width: '100%'}}>
          {inGamePlayers.map( player => <Player key={player.uid} player={player} />)}
        </ScrollView>


        {!currentPlayer.isOut && !currentPlayer.ready &&
        <ReadyButton/>
        }

        <View style={{display: 'flex', flexDirection: 'row'}}>
        <Button onPress={ () => {
          const batch = firestore.batch();
          inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {ready: true});
          });
          batch.commit().then( () => {});
        }}>
          <Text>Ready-all</Text>
        </Button>

        <Button onPress={toggleDisplayPlayerTypes} >
          <Text>toggle type</Text>
        </Button>
        </View>

      </View>
    )
  }
}


const mapStateToProps = state => ({
  gameData: state.game.gameData,
  gameDoc: state.game.gameDoc,
  inGamePlayers: getInGamePlayers(state),
  currentPlayer: getCurrentPlayer(state),
  allPlayersAreReady: areAllPlayersReady(state)
})

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(PreRound));
