import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import ProfilePicture from '../../../../components/profilePicture';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import MafiaLogo from '../../../../components/mafiaLogo';
import MafiaBackground from '../../../../components/mafiaBackground';
import PlayerOut from '../../../../components/playerOut';

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

      <View style={styles.page}>
        <NavigationEvents
          onWillFocus={this.screenWillFocus}
          onWillBlur={this.screenWillBlur}
        />

        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginBottom: 40}}>
          <Text size='large' color={'#2e2e2e'} style={{letterSpacing: 12, fontSize: 72}}>
            MAFIA
          </Text>

          <View style={{
            height: 30,
            width: 30,
            backgroundColor: 'red',
            borderWidth: 9,
            borderColor: 'white',
            borderRadius: 15,
            position: 'absolute',
            top: 12,
            right: 65
          }}/>
        </View>

        <TouchableOpacity style={{
          position: 'absolute',
          top: 10,
          right: 10,
          display: 'flex',
          alignItems: 'center'
        }}
                          onPress={this.gotoProfileScreen}>
          <ProfilePicture size={40} imageUri={user.photoURL}/>
          <Text size='small' color='black'>Profile</Text>
        </TouchableOpacity>

        <Button onPress={this.handleJoinGame}>
          <Text color='black' style={{letterSpacing: 2}}>Join Game</Text>
        </Button>

        <MafiaLogo/>


        <Button onPress={this.handleStartGame} style={{marginBottom: 80}}>
          <Text color='black' style={{letterSpacing: 2}}>Start New Game</Text>
        </Button>
      </View>
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
  user: state.user,
  state: state
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
