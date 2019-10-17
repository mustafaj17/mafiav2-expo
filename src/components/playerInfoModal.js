import React from 'react';
import { Animated, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { clearModalData } from '../redux/actions/modalActions';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Text from './text';
import ProfilePicture from './profilePicture';

class PlayerInfoModal extends React.Component {

  constructor(){
    super();
    this.top = new Animated.Value(0);
    this.left = new Animated.Value(0);
    this.width = new Animated.Value(0);
    this.height = new Animated.Value(0);
  }

  componentDidUpdate = () => {
    if(this.props.modal){
      this.openModal();
    }
  }

  openModal = () => {
    Animated.parallel([
      Animated.timing(this.top, {
        // and twirl
        toValue: 1,
        duration: 200
      }),
      Animated.timing(this.left, {
        // and twirl
        toValue: 1,
        duration: 200
      }),
      Animated.timing(this.width, {
        // and twirl
        toValue: 1,
        duration: 200
      }),
      Animated.timing(this.height, {
        // and twirl
        toValue: 1,
        duration: 200
      })
    ]).start();
  }

  closeModal = () => {
    Animated.parallel([
      Animated.timing(this.top, {
        // and twirl
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.left, {
        // and twirl
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.width, {
        // and twirl
        toValue: 0,
        duration: 200
      }),
      Animated.timing(this.height, {
        // and twirl
        toValue: 0,
        duration: 200
      })
    ]).start( () => {
      this.props.clearModalData();
    });

  }

  render() {

    if(!this.props.modal) return null;

    const deviceWidth = Dimensions.get('window').width;
    const deviceheight = Dimensions.get('window').height;
    const modalWidth = deviceWidth - 40
    const modalHeight = deviceheight - 80
    const { player, data } = this.props.modal;

    const opacity = this.top.interpolate({
      inputRange: [0,1],
      outputRange: [0.2, 0.6]
    })

    const top = this.top.interpolate({
      inputRange: [0,1],
      outputRange: [data.top - Constants.statusBarHeight, 40]
    })

    const left = this.left.interpolate({
      inputRange: [0,1],
      outputRange: [data.left, 20 ]
    })
    const width = this.width.interpolate({
      inputRange: [0,1],
      outputRange: [data.width, modalWidth ]
    })
    const height = this.left.interpolate({
      inputRange: [0,1],
      outputRange: [data.height, modalHeight ]
    })

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left:0,
          bottom: 0,
          right: 0,
          zIndex: 99,
        }}
      >
        <Animated.View style={{
          position: 'absolute',
          top: top,
          left: left,
          width: width,
          height: height,
          backgroundColor: '#eeeeee',
          borderWidth: 1,
          borderColor: 'black',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <TouchableOpacity onPress={this.closeModal} style={{ position: 'absolute' , top: 5, right: 10, zIndex: 2}}>
            <Ionicons name="md-close" size={32} color="black" />
          </TouchableOpacity>


          <Text style={{marginBottom: 10}}>{player.displayName}</Text>
          <ProfilePicture imageUri={player.photoURL}/>


          {player.stats &&
          <View style={{marginTop: 40}}>
            <Text size='small'>Games Played : {player.stats.gamesPlayed}</Text>
            <Text size='small'>Games Won : {player.stats.gamesWon}</Text>
            <Text size='small'>Games Won as Mafia : {player.stats.gamesWonAsMafia}</Text>
            <Text size='small'>Games Won as Civilian : {player.stats.gamesPlayed - player.stats.gamesWonAsMafia - player.stats.gamesLeft}</Text>
            <Text size='small'>Games Left : {player.stats.gamesLeft}</Text>
          </View>}



        </Animated.View>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
})

const mapDispatchToProps = dispatch => ({
  clearModalData : () => dispatch(clearModalData())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfoModal)
