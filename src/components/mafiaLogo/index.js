import React from 'react';
import { Image, View } from 'react-native';
import logo from '../../../assets/logo.png';

const MafiaLogo = (props) => {
    return (
      <View style={{height: props.size, marginBottom: 30, marginTop: 30, ...props.styles}}>
        <Image source={logo} style={{flex: 1, resizeMode: 'contain'}}/>
      </View>
    );
}

MafiaLogo.defaultProps = {
  size: 120
}

export default MafiaLogo;
