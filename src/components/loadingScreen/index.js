import React from 'react'
import { View } from 'react-native';
import globalStyles from '../../styles/global';
import AnimateLogo from '../amimatedLogo';
import MafiaBackground from '../mafiaBackground';

const LoadingScreen = () => {
  return (
    <MafiaBackground>
      <View style={globalStyles.page}>

        <AnimateLogo/>
      </View>
    </MafiaBackground>
  )
}

export default LoadingScreen;
