import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import AnimateLogo from '../amimatedLogo';
import { getPadding } from '../../../App';

const LoadingScreen = () => {
  return (
    <View
      style={{
        marginTop: -getPadding(),
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
