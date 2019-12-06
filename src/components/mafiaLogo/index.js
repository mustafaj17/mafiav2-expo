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
        marginBottom: 10,
        width: 100,
        ...props.styles
      }}>
        <Image source={logo} resizeMode='contain' style={{flex: 1}}/>
      </View>
    );
}

MafiaLogo.defaultProps = {
  size: 120
}

export default MafiaLogo;
