import React from 'react';
import { View } from 'react-native';
import Text from '../text';

const ErrorMessage = ({errorMessage}) =>
{
  return (
    <View style={{height: 30, paddingLeft: 10}}>
      <Text size='small' color='#ff5722'>{errorMessage}</Text>
    </View>
  );
}

export default ErrorMessage;
