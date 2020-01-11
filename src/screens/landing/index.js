import React from 'react';
import {
  BackHandler,
  ToastAndroid,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import globalStyles from '../../styles/global';
import { NavigationEvents } from 'react-navigation';
import Button from '../../components/button';
import Text from '../../components/text';
import logo from '../../../assets/mafia-lobby-logo2.png';
import MafiaBackground from '../../components/mafiaBackground';
import { Ionicons } from '@expo/vector-icons';
import mafia from '../../../assets/mafia-icon.png';
import civilian from '../../../assets/civilian-icon.png';
import HowToPlayModal from "../../components/howToPlayModal";

export default class Landing extends React.Component {
  state = {
    showWelcomeMessage: true,
    isHowToPlayAction: false
  };

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSeenWelcome');
      if (value !== 'true') {
        this.setState({ showWelcomeMessage: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  hideWelcomeMessage = async () => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
    } catch (error) {
      console.log(error);
    }
    this.setState({ showWelcomeMessage: false });
  };

  screenWillFocus = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };

  screenWillBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  };

  handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  };

  render() {
    const { navigation } = this.props;
    const { showWelcomeMessage, isHowToPlayAction } = this.state;
    return (
      <MafiaBackground>
        <HowToPlayModal
          visible={showWelcomeMessage}
          closeModal={isHowToPlayAction
          ? () => this.setState({showWelcomeMessage: false, isHowToPlayAction: false})
          : this.hideWelcomeMessage}
          isHowToPlayAction={isHowToPlayAction}
        />
        <View style={globalStyles.page}>
          <NavigationEvents
            onWillFocus={this.screenWillFocus}
            onWillBlur={this.screenWillBlur}
          />

          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Image
              source={mafia}
              resizeMode="contain"
              style={{ width: 40, height: 150 }}
            />
            <Image
              source={logo}
              resizeMode="contain"
              style={{ width: 250, height: 150 }}
            />
            <Image
              source={civilian}
              resizeMode="contain"
              style={{ width: 40, height: 150 }}
            />
          </View>

          <Button onPress={() => navigation.navigate('SignUp')}>
            <Text>Sign Up</Text>
          </Button>
        </View>

        <TouchableOpacity
          onPress={() => this.setState({showWelcomeMessage: true, isHowToPlayAction: true})}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingBottom: 50,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Ionicons name="md-book" size={32} color="#15D600" />
            <Text style={{ marginLeft: 10 }}>How To Play</Text>
          </View>
        </TouchableOpacity>
      </MafiaBackground>
    );
  }
}
