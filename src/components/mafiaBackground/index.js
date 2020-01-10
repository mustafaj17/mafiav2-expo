import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const MafiaBackground = props => {
  return (
    <LinearGradient
      start={{ x: 0, y: -0.5 }}
      end={{ x: 0, y: 1 }}
      colors={['#4d4d4d', '#1a1a1a']}
      style={{ flex: 1, width: '100%' }}
      {...props}>
      {props.children}
    </LinearGradient>
  );
};

export default MafiaBackground;
