import React from 'react';
import { Text as RNText} from 'react-native'
import PropTypes from 'prop-types';

const Text = (props) => {

  let size;
  switch (props.size) {
    case 'xsmall':
      size= 12;
      break;
    case 'small':
      size= 18;
      break;
    case 'medium':
      size= 22;
      break;
    case 'large':
      size= 26;
      break;
  }

  return (
    <RNText style={{
      fontFamily: `oxygen-${props.type}`,
      fontSize: size,
      color: props.color,
      ...props.style
    }}>
      {props.children}
    </RNText>
  );
}

Text.propTypes = {
  type: PropTypes.oneOf(['bold', 'regular', 'light']),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
  color: PropTypes.string
}

Text.defaultProps = {
  type: 'regular',
  size: 'medium',
  color: 'white'
}

export default Text;
