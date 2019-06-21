import React from 'react'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthLoading from './src/screens/authLoading'
import SignUp from './src/screens/signup'
import Login from './src/screens/login'
import Main from './src/screens/main';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const AppStack = createStackNavigator({
  Main: Main
}, {
  headerMode: 'none',
});
const AuthStack = createStackNavigator({
  SignUp : { screen: SignUp},
  Login : { screen: Login},
},
  {
    headerMode: 'none',
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