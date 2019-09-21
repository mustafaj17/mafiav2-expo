import React from 'react';
import { TYPE } from '../../constants';
import { View, StyleSheet, Image } from 'react-native';
import ProfilePicture  from '../profilePicture/profilePicture';
import { getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { connect } from 'react-redux';
import Text from '../text';
import { FontAwesome } from '@expo/vector-icons'
import mafiaIcon from '../../../assets/mafia-icon.png';
import civIcon from '../../../assets/civilian-icon.png';

export const Player = (props) => {


  const { showPlayerTypes, player, currentPlayer,showPlayerReady } = props;
  const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
  const playerMatch = currentPlayer && (currentPlayer.uid === player.uid);

  const getPlayerType = () => {

    if(!showPlayerTypes) return;


    const playerType= <Image source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
                             resizeMode='contain'
                             style= {{flex:1 , borderRadius: 20, width: '100%' }}/>

    if(currentPlayerIsCivilian) {
      if(playerMatch) {
        return (<View style={{
          height: 40,
          width: 40,
          marginLeft: 'auto',
          marginRight: 10
        }}>{playerType}</View>)
      }
      return null;
    }

    if(player.type !== TYPE.CIVILIAN) {
      return (<View style={{
        height: 40,
        width: 40,
        marginLeft: 'auto',
        marginRight: 10
      }}>{playerType}</View>)
    }else{
      return null;
    }
  }

  return(
    <View key={player.uid} style={styles.player}>
      <ProfilePicture imageUri={player.photoURL} size={50}/>
      <Text style={{marginLeft: 10}}>{player.displayName}</Text>
      {getPlayerType()}
      {showPlayerReady && player.ready && <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 40,
          bottom: 5,
          backgroundColor: '#008165',
          borderRadius: 15

        }}>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, 0.4)'
  },
});
