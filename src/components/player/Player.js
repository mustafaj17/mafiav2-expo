import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfilePicture  from '../profilePicture';
import { getCurrentPlayer } from '../../redux/selectors';
import { connect } from 'react-redux';
import Text from '../text';
import { FontAwesome } from '@expo/vector-icons'
import styles from './styles';

const Player = (props) => {


  const { player,showPlayerReady } = props;

  return(
    <View key={player.uid} style={styles.container}>
    <View style={styles.player}>
      <ProfilePicture imageUri={player.photoURL} size={50}/>
      <Text style={{marginLeft: 10}} color='black'>{player.displayName}</Text>

      {showPlayerReady && player.ready &&
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

      {props.children}
    </View>

    </View>
  )
}

const mapStateToProps = state => {
  return {
    currentPlayer: getCurrentPlayer(state),
  }
}

export default connect(mapStateToProps)(Player);


