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
import MafiaBackground from '../../components/mafiaBackground';
import { Ionicons } from '@expo/vector-icons';
import HowToPlayModal from "../../components/howToPlayModal";
import MafiaTextLogo from '../../components/mafiaTextLogo';
import { getPadding } from '../../../App';

export default class Landing extends React.Component {
  state = {
    showWelcomeMessage: false,
    isHowToPlayAction: false
  };

  componentDidMount = async () => {
    try {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      console.log('hasSeenWelcome ', typeof hasSeenWelcome);
      if (hasSeenWelcome !== 'true') {
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

          <Text>{getPadding()}</Text>

          <MafiaTextLogo/>

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
