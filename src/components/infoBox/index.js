import { View } from 'react-native';
import React from 'react';

const InfoText = props => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        minWidth: 200,
        ...props.style,
      }}>
      {props.children}
    </View>
  );
};

export default InfoText;
