import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../text';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        padding: 10,
        width: 200
      }}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Button;
