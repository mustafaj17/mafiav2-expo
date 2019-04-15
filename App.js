import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
// import the different screens
import Loading from './src/screens/loading'
import SignUp from './src/screens/signup'
import Login from './src/screens/login'
import Main from './src/screens/main'

// create our app's navigation stack
const App = createStackNavigator(
   {
       Loading : { screen: Loading},
       SignUp : { screen: SignUp},
       Login : { screen: Login},
       Main : { screen: Main},
   },
   {
       initialRouteName: 'Loading'
   }
)

export default createAppContainer(App)