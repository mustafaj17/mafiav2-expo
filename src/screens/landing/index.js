import React from 'react'
import { BackHandler, ToastAndroid, Image, View, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/global';
import {NavigationEvents} from "react-navigation";
import Button from '../../components/button';
import Text from '../../components/text';
import logo from '../../../assets/mafia-lobby-logo2.png';
import MafiaBackground from '../../components/mafiaBackground';
import { Ionicons } from '@expo/vector-icons';
import mafia from '../../../assets/mafia-icon.png';
import civilian from '../../../assets/civilian-icon.png';


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

          <View style={{ display: 'flex',  alignItems: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20  }}>
            <Image source={mafia}
                   resizeMode='contain'
                   style= {{width: 40, height: 150}}/>
            <Image source={logo}
                   resizeMode='contain'
                   style= {{width: 250, height: 150 }}/>
            <Image source={civilian}
                   resizeMode='contain'
                   style= {{width: 40, height: 150 }}/>
          </View>


          <Button onPress={() => navigation.navigate('SignUp')}>
            <Text >Sign Up</Text>
          </Button>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('HowToPlay')}
          style={{ position: 'absolute', bottom: 0, width: '100%',left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{paddingBottom: 50, display: 'flex', flexDirection: 'row'}}>
            <Ionicons name="md-book" size={32} color="#15D600" />
            <Text style={{marginLeft: 10}}>How To Play</Text>
          </View>
        </TouchableOpacity>
      </MafiaBackground>
    )
  }
}

