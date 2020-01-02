import React from 'react'
import { BackHandler, ToastAndroid, Image, View, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/global';
import {NavigationEvents} from "react-navigation";
import Button from '../../components/button';
import Text from '../../components/text';
import logo from '../../../assets/mafia-lobby-logo.png';
import MafiaBackground from '../../components/mafiaBackground';
import { Ionicons } from '@expo/vector-icons';


export default class Landing extends React.Component {
  screenWillFocus = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  screenWillBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  render() {
    const { navigation } = this.props;
    return (
      <MafiaBackground>
        <View style={globalStyles.page}>
          <NavigationEvents
            onWillFocus={this.screenWillFocus}
            onWillBlur={this.screenWillBlur}
          />


          <Button onPress={() => navigation.navigate('Login')}>
            <Text >Login</Text>
          </Button>

          <Image source={logo}
                 resizeMode='contain'
                 style= {{width: 300, height: 150, marginTop: 30, marginBottom: 30 }}/>


          <Button onPress={() => navigation.navigate('SignUp')}>
            <Text >Sign Up</Text>
          </Button>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('HowToPlay')}
          style={{ position: 'absolute', bottom: 0, width: '100%',left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{paddingBottom: 50, display: 'flex', flexDirection: 'row'}}>
            <Ionicons name="md-book" size={32} color="white" />
            <Text style={{marginLeft: 10}}>How To Play</Text>
          </View>
        </TouchableOpacity>
      </MafiaBackground>
    )
  }
}

