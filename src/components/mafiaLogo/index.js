import React from 'react';
import { Image, View } from 'react-native';
import logo from '../../../assets/logo.png';

const MafiaLogo = (props) => {
    return (
      <View style={{height: 120, marginBottom: 30, marginTop: 30, ...props.styles}}>
        <Image source={logo} style={{flex: 1, resizeMode: 'contain'}}/>
      </View>
    );
}

export default MafiaLogo;
