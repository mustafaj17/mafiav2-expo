import React from 'react';
import { View } from 'react-native';
import ProfilePicture  from '../profilePicture';
import { connect } from 'react-redux';
import Text from '../text';
import styles from './styles';

const Player = (props) => {


  const { player } = props;

  return(
    <View key={player.uid} style={styles.container}>
    <View style={styles.player}>
      <ProfilePicture imageUri={player.photoURL} size={50}/>
      <Text
        style={{marginLeft: 10}}
        color='black'>
        {player.displayName}
      </Text>
      {props.children}
    </View>

    </View>
  )
}

export default Player;


