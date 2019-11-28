import React from 'react'
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import ReadyButton from '../../../components/playerReadyButton';
import ToggleTypeButton from '../../../components/toggleTypeButton';
import {areAllPlayersReady, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import {firestore} from "../../../services/firebase";
import {toggleDisplayPlayerTypes, userHasSeenType} from '../../../redux/actions/gameActions';
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import PageTitle from '../../../components/pageTitle';
import PlayerWithToggleType from '../../../components/player/PlayerWithToggleType';
import { COLLECTIONS } from '../../../constants';
import CheckTypeMessage from "../../../components/checkTypeMessage";

class PreRound extends React.Component {
  state = {
    hideMessage: false
  };

  componentDidMount() {
    this.hasHiddenToggleMessage()
  }

  shouldComponentUpdate(nextProps){
    const { navigation, allPlayersAreReady } = nextProps;

    if(allPlayersAreReady) {
      navigation.navigate('InRound');
      return false;
    }

    return true;
  }

  hasHiddenToggleMessage = async () => {
    try {
      const value = await AsyncStorage.getItem('hideToggleType');
      if (value !== null) {
        this.setState({ hideMessage: true })
      }
    } catch (error) {
      console.log(error)
    }
  };

  render() {

    const { gameData, currentPlayer, inGamePlayers, gameDoc, userHasSeenType, userSeenType } = this.props;
    const { hideMessage } = this.state;

    return (
      <View style={styles.page}>


        <PageTitle title={gameData.gameName}/>

        <ScrollView style={{width: '100%', flex: 1}}>
          {inGamePlayers.map( player => <PlayerWithToggleType key={player.uid} player={player} />)}
          <View style={{height: 100}}/>
        </ScrollView>



        {!currentPlayer.isOut && userHasSeenType &&
        <View style={{
          position: 'absolute',
          width: '100%',
          flex: 1,
          bottom: 10,
          left: 0,
        }}>
          <ReadyButton/>
        </View>}


        <ToggleTypeButton />


        {!userHasSeenType && !hideMessage && <CheckTypeMessage userSeenType={userSeenType}/>}


        <TouchableOpacity onPress={ () => {
          const batch = firestore.batch();
          inGamePlayers.forEach(player => {
            batch.update(gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(player.email), {ready: true});
          });
          batch.commit().then( () => {});
        }}
                          style={{position: 'absolute', bottom: 100, left: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'pink',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text  size='xsmall'>Ready-all</Text>
        </TouchableOpacity>

      </View>

    )
  }
}


const mapStateToProps = state => ({
  gameData: state.game.gameData,
  gameDoc: state.game.gameDoc,
  userHasSeenType: state.game.userHasSeenType,
  inGamePlayers: getInGamePlayers(state),
  currentPlayer: getCurrentPlayer(state),
  allPlayersAreReady: areAllPlayersReady(state)
})

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes()),
  userSeenType : () => dispatch(userHasSeenType())
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(PreRound));
