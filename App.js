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
  }
));

const App = () => {
    return(
       <Provider store={store}>
           <Navigation/>
       </Provider>
    )
}

export default App;
