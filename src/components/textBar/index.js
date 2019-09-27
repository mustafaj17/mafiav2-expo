import React from 'react';
import Text from '../text';
import { View } from 'react-native';
import MafiaBackground from '../mafiaBackground';
import { LinearGradient } from 'expo-linear-gradient';

const TextBar = (props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}} end={{x: 0, y: 1}}
      colors={['rgba(253,253,253,0.5)', 'rgba(233,255,248,0.5)']}
      style={{ width: '100%' }}>

      <View style={{width: '100%', padding: 5, paddingLeft: 10}}>
        <Text color='black'>{props.title}</Text>
      </View>
    </LinearGradient>

  )
}

export default TextBar;
