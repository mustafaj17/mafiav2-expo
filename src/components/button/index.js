import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 4,
        padding: 15,
        width: 250,
        shadowColor: '#333333',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        backgroundColor: '#d5ffff',
        ...props.style
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
