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
        margin: 5,
        borderRadius: 4,
        padding: 10,
        width: 200,
        shadowColor: '#333333',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        backgroundColor: 'white',
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
