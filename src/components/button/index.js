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
        borderRadius: 5,
        padding: 15,
        width: props.width || 250,
        borderWidth:1,
        backgroundColor : '#1A1A1A',
        borderStyle : 'solid',
        borderColor : '#F2F2F2',
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
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
