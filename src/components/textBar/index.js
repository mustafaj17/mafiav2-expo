import React from 'react';
import Text from '../text';
import { View } from 'react-native';

const TextBar = (props) => {
  return (

    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 5,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 10,
      marginTop: 10
    }}>
      <Text color='black'>{props.title}</Text>
    </View>

  )
}

export default TextBar;
