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
        borderRadius: 2,
        padding: 15,
        width: props.width || 250,
        borderWidth:1,
        backgroundColor : '#001302',
        // borderStyle : 'solid',
        borderColor : '#15D600',
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
