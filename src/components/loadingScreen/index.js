import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import AnimateLogo from '../amimatedLogo';

const LoadingScreen = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <AnimateLogo />
    </View>
  );
};

export default LoadingScreen;
