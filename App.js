import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthLoading from './src/screens/authLoading'
import SignUp from './src/screens/signup'
import Terms from './src/screens/signup/terms'
import Login from './src/screens/login'
import Landing from './src/screens/landing'
import Main from './src/screens/main';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import LoadingScreen from './src/components/loadingScreen';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { View } from 'react-native';

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
      navigationOptions: () => ({
        title: 'Sign Up',
      })
    } ,
    Login : {
      screen: Login,
      navigationOptions: () => ({
        title: 'Login',
      })
    } ,
    Terms: {
      screen: Terms,
      navigationOptions: () => ({
        gesturesEnabled: false,
        header: null,
      })
    },
  },
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      headerStyle: {
        marginTop: -Constants.statusBarHeight,
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
      headerStyle: {
        marginTop: -Constants.statusBarHeight,
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
        <View style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}>
          {this.state.loadingFonts ?
            <LoadingScreen/>
            :
            <Navigation/>

          }
        </View>
      </Provider>
    )
  }
}

export default App;
