import React from 'react';
import { View } from 'react-native';
import ProfilePicture  from '../profilePicture';
import Text from '../text';
import styles from './styles';

const Player = (props) => {

  const { player, subText, greenSubText } = props;

  return(
    <View key={player.uid} style={styles.container}>
      <View style={styles.player}>
        <ProfilePicture imageUri={player.photoURL} size={50}/>
        <View style={{marginLeft: 15, display: 'flex', justifyContent: 'center'}}>
          <Text >
            {player.displayName}
          </Text>
          { subText && <Text color='#999999' size='small' letterSpacing={1} color={greenSubText ? '#00EB0A' : '#999999'}>
            {subText}
          </Text>}
        </View>
        {props.children}
      </View>
    </View>
  )
}

export default Player;


