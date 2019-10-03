import React from 'react'
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import AnimateLogo from '../amimatedLogo';

const LoadingScreen = () => {
  return (
      <View style={{...globalStyles.page, backgroundColor: '#6e6e6e'}}>

        <AnimateLogo/>
      </View>
  )
}

export default LoadingScreen;
