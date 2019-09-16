import React from 'react';
import { TYPE } from '../../constants';
import { View, StyleSheet } from 'react-native';
import ProfilePicture  from '../profilePicture/profilePicture';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { connect } from 'react-redux';
import Text from '../text';

const Player = (props) => {


    const { showPlayerTypes, player, currentPlayer } = props;
    const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
    const playerMatch = currentPlayer.uid === player.uid;

    const getPlayerType = () => {

      if(!showPlayerTypes) return;

      if(currentPlayerIsCivilian) {
        return (<Text>{playerMatch ? player.type : '?'}</Text>)
      }

      return (<Text>{player.type}</Text>)
    }

      return(
        <View key={player.uid} style={styles.player}>
          <ProfilePicture imageUri={player.photoURL} size={50}/>
          <Text>{player.displayName}</Text>
          {getPlayerType()}
        </View>
    )
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
    flex: 1,
    height: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black'
  },
});
