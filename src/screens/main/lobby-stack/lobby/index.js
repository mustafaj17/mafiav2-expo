import React, { Component } from 'react';
import { View, Text, Button, BackHandler, ToastAndroid } from 'react-native';
import styles from '../../../../styles/global';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { ProfilePicture } from '../../../../components/profilePicture/profilePicture';

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

        {user.data && <ProfilePicture imageUri={user.data.photoURL}/>}
        {user.data && <Text>Hello {user.data.email}!</Text>}
        <Button  title="Join Game" onPress={this.handleJoinGame} style={styles.button} />
        <Button  title="Start New Game" onPress={this.handleStartGame} style={styles.button} />
        <Button  title="My Profile" onPress={this.gotoProfileScreen} style={styles.button} />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);