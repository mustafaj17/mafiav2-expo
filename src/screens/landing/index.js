import React from 'react';
import {
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import globalStyles from '../../styles/global';
import Button from '../../components/button';
import Text from '../../components/text';
import MafiaBackground from '../../components/mafiaBackground';
import { Ionicons } from '@expo/vector-icons';
import HowToPlayModal from "../../components/howToPlayModal";
import MafiaTextLogo from '../../components/mafiaTextLogo';
import FBLoginButton from '../../components/facebookLogin';
import GoogleLogin from '../../components/googleLogin';
import {setUser, setUserStats} from '../../redux/actions/userActions';
import {connect} from 'react-redux';

class Landing extends React.Component {
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
          <MafiaTextLogo/>
          <FBLoginButton navigation={navigation} readPermissions={["public_profile email"]} />
          <GoogleLogin />
          <Button onPress={() => navigation.navigate('SignUp')}>
            <Text size="small">Continue with Email</Text>
          </Button>


          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
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

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setUserStats: stats => dispatch(setUserStats(stats))
});

export default connect(null, mapDispatchToProps)(Landing);