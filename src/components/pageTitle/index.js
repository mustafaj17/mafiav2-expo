import { View } from 'react-native';
import React from 'react';
import Text from '../text';

const PageTitle = props => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        paddingBottom: 5,
      }}>
      <Text size="large" color="white" type="bold">
        {props.title}
      </Text>
    </View>
  );
};

export default PageTitle;
