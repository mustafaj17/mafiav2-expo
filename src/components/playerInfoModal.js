import React from 'react';
import { Animated, Dimensions, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { clearModalData } from '../redux/actions/modalActions';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Text from './text';
import ProfilePicture from './profilePicture';
import MafiaBackground from './mafiaBackground';

class PlayerInfoModal extends React.Component {

  closeModal = () => {
    this.props.clearModalData();
  }

  render() {


    const { player } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={player !== null}
      >

        <MafiaBackground>

          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            { player &&
            <>
              <TouchableOpacity onPress={this.closeModal} style={{ position: 'absolute' , top: 25, right: 10, zIndex: 2}}>
                <Ionicons name="md-close" size={32} color="black" />
              </TouchableOpacity>


              <Text style={{marginBottom: 10}}>{player.displayName}</Text>
              <ProfilePicture imageUri={player.photoURL}/>


              {player.stats &&
              <View style={{marginTop: 40}}>
                <Text size='small'>Games Played : {player.stats.gamesPlayed}</Text>
                <Text size='small'>Games Won : {player.stats.gamesWon}</Text>
                <Text size='small'>Games Won as Mafia : {player.stats.gamesWonAsMafia}</Text>
                <Text size='small'>Games Won as Civilian : {player.stats.gamesWon - player.stats.gamesWonAsMafia - player.stats.gamesLeft}</Text>
                <Text size='small'>Games Lost : {player.stats.gamesPlayed - player.stats.gamesWon}</Text>
                <Text size='small'>Games Left : {player.stats.gamesLeft}</Text>
              </View>}
            </>
            }
          </View>
        </MafiaBackground>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
})

const mapDispatchToProps = dispatch => ({
  clearModalData : () => dispatch(clearModalData())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfoModal)
