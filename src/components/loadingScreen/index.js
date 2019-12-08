import React from 'react'
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import AnimateLogo from '../amimatedLogo';

const LoadingScreen = () => {
  return (
      <View style={{...globalStyles.page}}>

        <AnimateLogo/>
      </View>
  )
}

export default LoadingScreen;
