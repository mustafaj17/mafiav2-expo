import React from 'react';
import { View } from 'react-native';
import AnimateLogo from '../amimatedLogo';
import { getPadding } from '../../../App';
import Text from '../text';

const LoadingScreen = props => {
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
      {props.text && <Text color='black' size='small' style={{marginTop: 10}}>{props.text}</Text>}
    </View>
  );
};

export default LoadingScreen;
