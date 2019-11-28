import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import MafiaLogo from '../../../../components/mafiaLogo';
import {FontAwesome} from "@expo/vector-icons";
import { firestore } from '../../../../services/firebase';
import { setUserStats } from '../../../../redux/actions/userActions';
import { COLLECTIONS } from '../../../../constants';
import MafiaBackground from "../../../../components/mafiaBackground";

class Lobby extends Component {
  screenWillFocus= async () => {
    const { user } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const userStats = await firestore.collection(COLLECTIONS.STATS).doc(user.email).get();
    if(userStats.exists) {
      this.props.setUserStats(userStats.data());
    }else {
      const newStats = {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesWonAsMafia: 0,
        gamesLeft: 0
      };
      firestore.collection(COLLECTIONS.STATS).doc(user.email).set(newStats)
      this.props.setUserStats(newStats);
    }
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

    return(
      <MafiaBackground>
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

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center'
            }}
            onPress={this.gotoProfileScreen}
          >
            <FontAwesome name='user-circle-o' color='#000' size={34}/>
          </TouchableOpacity>

          <Button onPress={this.handleJoinGame}>
            <Text  style={{letterSpacing: 2}}>Join Game</Text>
          </Button>

          <MafiaLogo/>

          <Button onPress={this.handleStartGame} style={{marginBottom: 80}}>
            <Text  style={{letterSpacing: 2}}>Start New Game</Text>
          </Button>
        </View>
      </MafiaBackground>
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
const mapDispatchToProps = dispatch => ({
  setUserStats : stats => dispatch(setUserStats(stats))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
