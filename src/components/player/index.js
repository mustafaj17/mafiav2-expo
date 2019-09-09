import React from 'react';
import { TYPE } from '../../constants';
import { Text, View, StyleSheet } from 'react-native';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { connect } from 'react-redux';

class Player extends React.Component {

  render() {

    const { showPlayerTypes, player, currentPlayer } = this.props;
    const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
    const playerMatch = currentPlayer.uid === player.uid;

    if(currentPlayerIsCivilian) {
      return(
        <View key={player.displayName} style={styles.player}>
          <ProfilePicture imageUri={player.photoURL} size={50}/>
          <Text>{player.displayName}</Text>
          {showPlayerTypes &&  <Text>{playerMatch ? player.type : '?'}</Text> }
        </View>
      )
    }
    return(
      <View key={player.displayName} style={styles.player}>
        <ProfilePicture imageUri={player.photoURL} size={50}/>
        <Text>{player.displayName}</Text>
        {showPlayerTypes && <Text>{player.type}</Text>}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: getCurrentPlayer(state),
    showPlayerTypes: state.game.showPlayerTypes
  }
}

export default connect(mapStateToProps)(Player);


const styles =  StyleSheet.create({
  player: {
    display: 'flex',
    width: '100%',
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
