import { View } from 'react-native';
import React from 'react';
import Text from '../text';

const PageTitle = (props) => {
  return (
    <View style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 5,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
    }}>
      <Text size='large' color='black'>{props.title}</Text>
    </View>
  )
}

export default PageTitle
