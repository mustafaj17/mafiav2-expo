import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import ReadyButton from '../../../components/playerReadyButton';
import ToggleTypeButton from '../../../components/toggleTypeButton';
import {areAllPlayersReady, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import {firestore} from "../../../services/firebase";
import { toggleDisplayPlayerTypes } from '../../../redux/actions/gameActions';
import GameScreenHOC from "../../../components/gameScreenHoc";
import Player from '../../../components/player';
import Text from '../../../components/text';

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

        <View><Text type='bold'  style={{marginTop: 10}}>{gameData.gameName}</Text></View>

        <ScrollView style={{width: '100%', flex: 1}}>
          {inGamePlayers.map( player => <Player key={player.uid} player={player} showPlayerReady={true}/>)}
        </ScrollView>



        {!currentPlayer.isOut &&
        <View style={{ marginBottom: 10}}>
          <ReadyButton/>
        </View>}


        <ToggleTypeButton />


        <TouchableOpacity onPress={ () => {
          const batch = firestore.batch();
          inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection('players').doc(player.email), {ready: true});
          });
          batch.commit().then( () => {});
        }}
                          style={{position: 'absolute', bottom: 100, left: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'pink',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text color='black' size='xsmall'>Ready-all</Text>
        </TouchableOpacity>



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
