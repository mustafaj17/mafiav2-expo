import React from 'react';
import { TYPE } from '../../constants';
import { View, Image } from 'react-native';
import ProfilePicture  from '../profilePicture';
import { getCurrentPlayer } from '../../redux/selectors';
import { connect } from 'react-redux';
import Text from '../text';
import { FontAwesome } from '@expo/vector-icons'
import mafiaIcon from '../../../assets/mafia-icon3.png';
import civIcon from '../../../assets/civilian-icon.png';
import AnimatedType from '../animatedType';
import styles from './styles';

export const PlayerWithToggleType = (props) => {


  const { player, currentPlayer } = props;
  const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
  const playerMatch = currentPlayer && (currentPlayer.uid === player.uid);

  const getPlayerType = () => {

    const playerType = (<View style={{ marginLeft: 'auto', marginRight: 10 }}>
      <AnimatedType>
        <Image source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
               resizeMode='contain'
               style= {{flex:1 , width: '100%' }}/>
      </AnimatedType>
    </View>)

    if(currentPlayerIsCivilian) {
      if(playerMatch) {
        return playerType;
      }
      return null;
    }

    if(player.type !== TYPE.CIVILIAN) {
      return playerType;
    }else{
      return null;
    }
  }

  return(
    <View key={player.uid} style={styles.container}>
      <View style={styles.player}>
        <ProfilePicture imageUri={player.photoURL} size={50}/>
        <Text style={{marginLeft: 10}} color='black'>{player.displayName}</Text>

        {player.ready &&
        <View
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

        {getPlayerType()}
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    currentPlayer: getCurrentPlayer(state),
    showPlayerTypes: state.game.showPlayerTypes
  }
}

PlayerWithToggleType.defaultProps = {
  currentPlayer: false
}

export default connect(mapStateToProps)(PlayerWithToggleType);

