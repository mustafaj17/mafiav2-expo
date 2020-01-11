import React from 'react';
import { Image, View } from 'react-native';
import mafia from '../../../assets/mafia-icon.png';
import logo from '../../../assets/mafia-lobby-logo2.png';
import civilian from '../../../assets/civilian-icon.png';

export default class MafiaTextLogo extends React.Component {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
          marginTop: 10,
        }}>
        <Image
          source={mafia}
          resizeMode="contain"
          style={{ width: 40, height: 150, zIndex: 1, marginRight: -15 }}
        />
        <Image
          source={logo}
          resizeMode="contain"
          style={{ width: 250, height: 150, zIndex: 2 }}
        />
        <Image
          source={civilian}
          resizeMode="contain"
          style={{ width: 40, height: 150, zIndex: 1, marginLeft: -15 }}
        />
      </View>
    );
  }
}
