import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <TouchableHighlight underlayColor='transparent' onPress={props.onPress}>
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
        elevation: 5,
        backgroundColor: '#cbf5f5',
        ...props.style
      }}>
        {props.children}
      </View>
    </TouchableHighlight>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Button;
