import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import globalStyles from '../../styles/global';

const LoadingScreen = () => {
  return (
    <View style={globalStyles.page}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default LoadingScreen;
