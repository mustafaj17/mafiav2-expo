import React, { Component } from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Text from '../../../../components/text';
import Button from '../../../../components/button';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { firestore } from '../../../../services/firebase';
import { setUserStats } from '../../../../redux/actions/userActions';
import { COLLECTIONS, TYPE } from '../../../../constants';
import MafiaBackground from '../../../../components/mafiaBackground';
import HowToPlayModal from "../../../../components/howToPlayModal";
import MafiaTextLogo from '../../../../components/mafiaTextLogo';
import { YesNoModal } from '../../../../components/YesNoModal';
import FeedbackModal from '../../../../components/feedbackModal';

class Lobby extends Component {
  state={
    showHowToPlay: false,
    showCloseAppModal: false,
    showFeedbackModal: false
  };

  screenWillFocus = async () => {
    const { user } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    if (!user.stats) {
      await this.getUserStats()
    }
  };

  getUserStats = async () => {
    const { email } = this.props.user;
    const userStats = await firestore.collection(COLLECTIONS.STATS).doc(email).get();
    this.props.setUserStats(userStats.data());
  }

  handleBackButton = () => {
    this.setState({showCloseAppModal: true} );
    return true;
  };

  screenWillBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  };

  handleJoinGame = () => {
    this.props.navigation.navigate('StartOrJoinGame', {
      isUserStartingGame: false,
    });
  };

  handleStartGame = () => {
    this.props.navigation.navigate('StartOrJoinGame', {
      isUserStartingGame: true,
    });
  };

  gotoProfileScreen = () => {
    this.props.navigation.navigate('UserProfile');
  };

  hideHowToPlay = () => {
    this.setState({ showHowToPlay: false });
  };

  render() {
    const { showHowToPlay, showCloseAppModal, showFeedbackModal } = this.state;
    return (
      <MafiaBackground>
        <HowToPlayModal visible={showHowToPlay} isHowToPlayAction closeModal={this.hideHowToPlay} />

        <FeedbackModal visible={showFeedbackModal} closeModal={() => this.setState({showFeedbackModal: false})}/>

        <YesNoModal
          visible={showCloseAppModal}
          closeModal={() => this.setState({showCloseAppModal: false})}
          onConfirm={()=> BackHandler.exitApp()}
          question='Close Mafia?'
        />

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
              zIndex: 99,
            }}
            onPress={this.gotoProfileScreen}>
            <FontAwesome name="user-circle-o" color="#fff" size={34} />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button onPress={this.handleStartGame}>
              <Text>START GAME</Text>
            </Button>

            <MafiaTextLogo/>



            <Button onPress={this.handleJoinGame}>
              <Text>JOIN GAME</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingBottom: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <TouchableOpacity onPress={() => this.setState({showHowToPlay: true})}>
              <View style={{display: 'flex',flexDirection: 'row', marginBottom: 20}}>
                <Ionicons name="md-book" size={32} color="#15D600" />
                <Text style={{ marginLeft: 10 }}>How To Play</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({showFeedbackModal: true})}>
              <View style={{display: 'flex',flexDirection: 'row'}}>
                <MaterialIcons name="feedback" size={32} color="#15D600" />
                <Text style={{ marginLeft: 10 }}>Give Feedback</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </MafiaBackground>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  setUserStats: stats => dispatch(setUserStats(stats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
