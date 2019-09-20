import React from 'react';
import { TYPE } from '../../constants';
import { View, StyleSheet } from 'react-native';
import ProfilePicture  from '../profilePicture/profilePicture';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { connect } from 'react-redux';
import Text from '../text';
import { FontAwesome } from '@expo/vector-icons'

export const Player = (props) => {


    const { showPlayerTypes, player, currentPlayer,showPlayerReady } = props;
    const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
    const playerMatch = currentPlayer && (currentPlayer.uid === player.uid);

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
          <Text style={{marginLeft: 10}}>{player.displayName}</Text>
          {getPlayerType()}
          {showPlayerReady && player.ready && <View
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginLeft: 'auto', marginRight: 20}}>
            <FontAwesome name='check-circle' color='#00FFC2' size={24}/>
          </View>}
        </View>
    )
}

const mapStateToProps = state => {
  return {
    currentPlayer: getCurrentPlayer(state),
    showPlayerTypes: state.game.showPlayerTypes
  }
}

Player.defaultProps = {
  currentPlayer: false,
  showPlayerReady: false
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
    paddingLeft: 5,
    margin: 5,
  },
});
