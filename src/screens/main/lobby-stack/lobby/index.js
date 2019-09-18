import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import ProfilePicture from '../../../../components/profilePicture/profilePicture';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

class Lobby extends Component {
  screenWillFocus= () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  screenWillBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleJoinGame = () => {
    this.props.navigation.navigate('StartOrJoinGame', {isUserStartingGame: false})
  }

  handleStartGame = () => {
    this.props.navigation.navigate('StartOrJoinGame', {isUserStartingGame: true})
  }


  gotoProfileScreen = () => {
    this.props.navigation.navigate('UserProfile')
  }

  render(){

    const { user } = this.props;

    return(
      <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={['#2916a8', '#9412B5']}
        style={{ flex: 1, width: '100%' }}>
        <View style={styles.page}>
          <NavigationEvents
            onWillFocus={this.screenWillFocus}
            onWillBlur={this.screenWillBlur}
          />



          <TouchableOpacity style={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            alignItems: 'center'
          }}
                            onPress={this.gotoProfileScreen}>
            <FontAwesome name='user-circle-o' size={40} color='#333333'/>
            <Text>Profile</Text>
          </TouchableOpacity>

          <Text>Hello {user.displayName}!</Text>
          <ProfilePicture imageUri={user.photoURL} />
          <Button onPress={this.handleJoinGame}>
            <Text>Join Game</Text>
          </Button>
          <Button onPress={this.handleStartGame} >
            <Text>Start New Game</Text>
          </Button>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create(
  {
    page: {
      display: 'flex',
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
);


const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
