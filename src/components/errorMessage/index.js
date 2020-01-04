import React from 'react';
import { View } from 'react-native';
import Text from '../text';

const ErrorMessage = ({errorMessage}) =>
{
  return (
      <Text size='small' color='#ff5722' letterSpacing={1} style={{textAlign: 'center'}}>{errorMessage}</Text>
  );
}

export default ErrorMessage;
