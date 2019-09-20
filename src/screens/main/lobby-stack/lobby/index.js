import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import ProfilePicture from '../../../../components/profilePicture/profilePicture';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import { LinearGradient } from 'expo-linear-gradient';
import MafiaLogo from '../../../../components/mafiaLogo';

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
        start={{x: 0, y: -0.5}} end={{x: 0, y: 1}}
        colors={['#2bbb81', '#3670bf']}
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
            <ProfilePicture size={40} imageUri={user.photoURL}/>
            <Text size='small'>Profile</Text>
          </TouchableOpacity>

          <Button onPress={this.handleJoinGame}>
            <Text color='black'>Join Game</Text>
          </Button>

        <MafiaLogo/>


          <Button onPress={this.handleStartGame} >
            <Text color='black'>Start New Game</Text>
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
      alignItems: 'center',
    }
  }
);


const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
