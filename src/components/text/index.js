import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

const Text = props => {
  let size;
  switch (props.size) {
    case 'xxsmall':
      size = 12;
      break;
    case 'xsmall':
      size = 16;
      break;
    case 'small':
      size = 18;
      break;
    case 'medium':
      size = 22;
      break;
    case 'large':
      size = 26;
      break;
    case 'xlarge':
      size = 52;
      break;
  }

  return (
    <RNText
      style={{
        fontFamily: `oxygen-${props.type}`,
        fontSize: size,
        color: props.color,
        letterSpacing: props.letterSpacing,
        ...props.style,
      }}
      onPress={props.onPress}>
      {props.children}
    </RNText>
  );
};

Text.propTypes = {
  type: PropTypes.oneOf(['bold', 'regular', 'light']),
  size: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large']),
  color: PropTypes.string,
  letterSpacing: PropTypes.number,
};

Text.defaultProps = {
  type: 'regular',
  size: 'medium',
  color: 'white',
  letterSpacing: 2,
};

export default Text;
