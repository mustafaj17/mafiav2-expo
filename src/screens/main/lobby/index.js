import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import styles from '../../../styles/global';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { ProfilePicture } from '../../../components/profilePicture/profilePicture';

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
    this.props.navigation.navigate('JoinGame')
  }

  handleStartGame = () => {
    this.props.navigation.navigate('StartGame')
  }



  render(){

    const { user } = this.props;

    return(
      <View style={styles.page}>
        <NavigationEvents
          onWillFocus={this.screenWillFocus}
          onWillBlur={this.screenWillBlur}
        />

        {user.data && <ProfilePicture imageUri={user.data.photoURL}/>}
        {user.data && <Text>Hello {user.data.email}!</Text>}
        <TouchableOpacity  onPress={this.handleJoinGame} style={styles.button}>
          <Text >Join Game</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={this.handleStartGame} style={styles.button}>
          <Text >Start New Game</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
