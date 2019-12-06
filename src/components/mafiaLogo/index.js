import React from 'react';
import { Image, View } from 'react-native';
import logo from '../../../assets/logo.png';

const MafiaLogo = (props) => {
    return (
      <View style={{
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        height: props.size,
        marginBottom: 20,
        ...props.styles
      }}>
        <Image source={logo} style={{flex: 1, resizeMode: 'contain'}}/>
      </View>
    );
}

MafiaLogo.defaultProps = {
  size: 120
}

export default MafiaLogo;
