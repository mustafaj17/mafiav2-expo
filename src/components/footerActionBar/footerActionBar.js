import React from 'react';
import { View } from 'react-native';

const FooterActionBar = (props) => {
    return (
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: 30,
          height: 100
        }}>
        {props.children}
      </View>
    );
}

export default FooterActionBar;
