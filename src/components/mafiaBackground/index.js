import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

const MafiaBackground = props =>{
    return (
      <View style={{ flex: 1, width: '100%', backgroundColor: '#fdfdfd' }}>
        {props.children}
      </View>
      )

      return (<LinearGradient
        start={{x: 0, y: -0.5}} end={{x: 0, y: 1}}
        colors={['#2bbb81', '#3670bf']}
        style={{ flex: 1, width: '100%' }}>
        {props.children}
      </LinearGradient>

    );
}

export default MafiaBackground;
