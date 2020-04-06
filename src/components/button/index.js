import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={props.onPress} disabled={props.disabled}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: props.margin || 10,
          borderRadius: 2,
          padding: props.padding || 15,
          width: props.width || 250,
          borderWidth: 1,
          backgroundColor: props.secondary ? '#0f9600' : '#001302',
          // borderStyle : 'solid',
          borderColor: props.secondary ? '#001302' : '#0f9600',
          ...props.style,
        }}>
        {props.children}
      </View>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  secondary: false,
  disabled: false,
};

export default Button;
