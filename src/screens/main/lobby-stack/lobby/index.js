import React, { Component } from 'react';
import { View, BackHandler, ToastAndroid, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import MafiaLogo from '../../../../components/mafiaLogo';
import {FontAwesome} from "@expo/vector-icons";
import { firestore } from '../../../../services/firebase';
import { setUserStats } from '../../../../redux/actions/userActions';
import { COLLECTIONS, TYPE } from '../../../../constants';
import MafiaBackground from "../../../../components/mafiaBackground";
import civIcon from '../../../../../assets/civilian-icon.png';
import mafiaIcon from '../../../../../assets/mafia-icon.png';

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

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
            {/*<MafiaLogo size={55} styles={{marginBottom: -5}}/>*/}
            <Text size='large' color={'#2e2e2e'} style={{letterSpacing: 12, fontSize: 60}}>
              MAFIA
            </Text>
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

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
            <Button onPress={this.handleJoinGame}>
              <Text  style={{letterSpacing: 2}}>Join Game</Text>
            </Button>

            <Button onPress={this.handleStartGame} style={{marginBottom: 80}}>
              <Text  style={{letterSpacing: 2}}>Start New Game</Text>
            </Button>
          </View>


          <Image source={civIcon}
                 resizeMode='contain'
                 style= {{flex:1, width: 150, height: 300, position: 'absolute', bottom: -50, left: -10  }}/>
          <Image source={mafiaIcon}
                 resizeMode='contain'
                 style= {{flex:1 , width: 150, height: 300, position: 'absolute', bottom: -50, right: -30 }}/>

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
