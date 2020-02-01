import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthLoading from './src/screens/authLoading'
import SignUp from './src/screens/signup'
import Login from './src/screens/login'
import Landing from './src/screens/landing'
import Main from './src/screens/main';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import LoadingScreen from './src/components/loadingScreen';
import * as Font from 'expo-font';
import { View } from 'react-native';
import MafiaBackground from "./src/components/mafiaBackground";
import { Dimensions, Platform } from 'react-native';

const AppStack = createStackNavigator({
  Main: Main
}, {
  headerMode: 'none',
});

const AuthStack = createStackNavigator({
    Landing: {
      screen: Landing,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null,
      })
    },
    SignUp : {
      screen: SignUp,
    } ,
    Login : {
      screen: Login,
    } ,
  },
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTransparent: true,
      headerTintColor: 'white',
      headerStyle: {
        marginTop: -getPadding()
      }
    }

  });

let Navigation = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTransparent: true,
      headerTintColor: 'white',
      headerStyle: {
        marginTop: -getPadding()
      }
    }
  }
));

class App extends React.Component{

  state = {
    loadingFonts: true
  }

  async componentDidMount() {
    await Font.loadAsync({
      'oxygen-light' : require('./assets/fonts/Oxygen/Oxygen-Light.ttf'),
      'oxygen-regular' : require('./assets/fonts/Oxygen/Oxygen-Regular.ttf'),
      'oxygen-bold' : require('./assets/fonts/Oxygen/Oxygen-Bold.ttf'),
    })

    this.setState({
      loadingFonts: false
    })
  }

  render() {

    return (
      <Provider store={store}>
        <MafiaBackground style={{ flex: 1 }}>
          <View style={{
            paddingTop: getPadding(),
            flex: 1
          }}>
            {this.state.loadingFonts ?
              <LoadingScreen/>
              :
              <Navigation/>
            }
          </View>
        </MafiaBackground>
      </Provider>
    )
  }
}

export default App;

export function getPadding(){
  return Platform.OS === 'android' ? 0 : isIphoneX() ? 40 : 30;
}

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}

export function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}