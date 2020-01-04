import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import {FontAwesome} from "@expo/vector-icons";
import { firestore } from '../../../../services/firebase';
import { setUserStats } from '../../../../redux/actions/userActions';
import { COLLECTIONS, TYPE } from '../../../../constants';
import MafiaBackground from "../../../../components/mafiaBackground";
import logo from '../../../../../assets/mafia-lobby-logo2.png';
import mafia from '../../../../../assets/mafia-icon.png';
import civilian from '../../../../../assets/civilian-icon.png';

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

          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center',
              zIndex: 99
            }}
            onPress={this.gotoProfileScreen}
          >
            <FontAwesome name='user-circle-o' color='#fff' size={34}/>
          </TouchableOpacity>

          <View style={{ flex:1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>


            <Button onPress={this.handleStartGame}>
              <Text>START GAME</Text>
            </Button>

            <View style={{ display: 'flex',  alignItems: 'center', flexDirection: 'row', marginBottom: 20, marginTop: 20  }}>
              <Image source={mafia}
                     resizeMode='contain'
                     style= {{width: 40, height: 150}}/>
            <Image source={logo}
                   resizeMode='contain'
                   style= {{width: 250, height: 150 }}/>
              <Image source={civilian}
                     resizeMode='contain'
                     style= {{width: 40, height: 150 }}/>
            </View>

            <Button onPress={this.handleJoinGame}>
              <Text>JOIN GAME</Text>
            </Button>
          </View>

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
