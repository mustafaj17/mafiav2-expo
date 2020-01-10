import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import ReadyButton from '../../../components/playerReadyButton';
import ToggleTypeButton from '../../../components/toggleTypeButton';
import {
  areAllPlayersReady,
  getCurrentPlayer,
  getInGamePlayers,
} from '../../../redux/selectors';
import { firestore } from '../../../services/firebase';
import {
  toggleDisplayPlayerTypes,
  userHasSeenType,
} from '../../../redux/actions/gameActions';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Text from '../../../components/text';
import PageTitle from '../../../components/pageTitle';
import PlayerWithToggleType from '../../../components/player/PlayerWithToggleType';
import { COLLECTIONS, TYPE } from '../../../constants';
import CheckTypeMessage from '../../../components/checkTypeMessage';

class PreRound extends React.Component {
  state = {
    hideMessage: true,
  };

  componentDidMount() {
    if (!this.props.gameData.votingComplete) this.hasHiddenToggleMessage();
  }

  shouldComponentUpdate(nextProps) {
    const { navigation, allPlayersAreReady } = nextProps;

    if (allPlayersAreReady) {
      navigation.navigate('InRound');
      return false;
    }

    return true;
  }

  hasHiddenToggleMessage = async () => {
    try {
      const value = await AsyncStorage.getItem('hideToggleType');
      if (value !== 'true') {
        this.setState({ hideMessage: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getMafiaCount = () => {
    const { inGamePlayers } = this.props;

    return inGamePlayers.reduce((acc, player) => {
      if (player.type === TYPE.MAFIA) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  render() {
    const {
      gameData,
      currentPlayer,
      inGamePlayers,
      gameDoc,
      userHasSeenType,
      userSeenType,
    } = this.props;
    const { hideMessage } = this.state;
    const mafiaCount = this.getMafiaCount();

    return (
      <View style={styles.page}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <PageTitle title={gameData.gameName} />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text color="#00EB0A" style={{ marginRight: 5 }}>
              {mafiaCount}
            </Text>
            <Text>Mafia{mafiaCount > 1 && "'s"} remaining</Text>
          </View>
        </View>

        <ScrollView style={{ width: '100%', flex: 1 }}>
          {inGamePlayers.map(player => (
            <PlayerWithToggleType key={player.uid} player={player} />
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>

        {!currentPlayer.isOut && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 80,
              flex: 1,
              bottom: 10,
              left: 0,
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
            }}>
            <ReadyButton />
            <ToggleTypeButton />
          </View>
        )}

        {!userHasSeenType && !hideMessage && (
          <CheckTypeMessage
            hideMessage={() => this.setState({ hideMessage: true })}
            userSeenType={userSeenType}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            const batch = firestore.batch();
            inGamePlayers.forEach(player => {
              batch.update(
                gameDoc.ref.collection(COLLECTIONS.PLAYERS).doc(player.email),
                { ready: true },
              );
            });
            batch.commit().then(() => {});
          }}
          style={{
            position: 'absolute',
            bottom: 100,
            left: 10,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'pink',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text size="xxsmall">Ready-all</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameData: state.game.gameData,
  gameDoc: state.game.gameDoc,
  userHasSeenType: state.game.userHasSeenType,
  inGamePlayers: getInGamePlayers(state),
  currentPlayer: getCurrentPlayer(state),
  allPlayersAreReady: areAllPlayersReady(state),
});

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes()),
  userSeenType: () => dispatch(userHasSeenType()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(PreRound));
