import React from 'react';
import { Text as RNText} from 'react-native';

const Text = (props) => {
    return (
      <RNText style={{
          fontFamily: 'font-name'
      }}>
          {props.children}
      </RNText>
    );
}

export default Text;
