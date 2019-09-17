import React from 'react';
import { Text as RNText} from 'react-native'
import PropTypes from 'prop-types';

const Text = (props) => {

  let size;
  switch (props.size) {
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
      ...props.style
    }}>
      {props.children}
    </RNText>
  );
}

Text.propTypes = {
  type: PropTypes.oneOf(['bold', 'regular', 'light']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}

Text.defaultProps = {
  type: 'regular',
  size: 'medium'
}

export default Text;
