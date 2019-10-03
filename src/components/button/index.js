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
        borderColor: '#525358',
        borderWidth:1,
        shadowColor: '#aaaaaa',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#fffdfd',
        borderBottomColor: '#777777',
        borderBottomWidth: 2,
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
