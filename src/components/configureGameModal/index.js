import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import MafiaBackground from '../mafiaBackground';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../text';
import Button from '../button';
import { areAllPlayersReady, getCurrentPlayer, getInGamePlayers } from '../../redux/selectors';
import { connect } from 'react-redux';
import { setGameConfig } from '../../redux/actions/gameActions';

class ConfigureGameModal extends React.Component{

  constructor(props) {
    super(props);
    debugger;
    this.state = {
      mafiaCount:((Math.ceil(props.playerCount  / 2 ) ) -1),
      maxMafiaCount:((Math.ceil(props.playerCount  / 2 ) ) -1),
      minMafiaCount: 1,
      timer: 60
    }
  }

  componentDidUpdate(prevProps) {
    const { playerCount } = this.props;
    if(prevProps.playerCount !== playerCount){
      this.setState({
        mafiaCount:((Math.floor((playerCount +1 ) / 2 ) ) -1),
        maxMafiaCount:((Math.floor((playerCount +1 ) / 2 ) ) -1),
      })
    }
  }

  increaseMafiaCount = () => {
    const { mafiaCount, maxMafiaCount } = this.state;
    if(mafiaCount === maxMafiaCount ){
      return;
    }
    this.setState({
      mafiaCount: mafiaCount + 1
    })
  }

  decreaseMafiaCount = () => {
    const { mafiaCount, minMafiaCount } = this.state;
    if(mafiaCount === minMafiaCount){
      return;
    }

    this.setState({
      mafiaCount: mafiaCount - 1
    })
  }

  increaseRoundTimer = () => {
    const { timer } = this.state;

    //180 is timer max
    if(timer === 180){
      return;
    }

    this.setState({
      timer: timer + 30
    })
  }

  decreaseRoundTimer = () => {
    const { timer } = this.state;

    //30 is timer min
    if(timer === 30){
      return;
    }

    this.setState({
      timer: timer - 30
    })
  }

  setGameConfig = ()=>{
    const { setGameConfig, closeModal } = this.props
    const { timer, mafiaCount } = this.state;
    setGameConfig({
      timer,
      mafiaCount
    })

    closeModal();
  }

  render(){

    const { visible, closeModal } = this.props;
    const { mafiaCount, timer } = this.state;

    return(
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{
            paddingTop: 40,
            height: 450,
            width: '100%',
          }}>

            <MafiaBackground>
              <View style={{
                position: 'relative',
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#00EB0A',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 20,
              }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10
                  }}
                  onPress={closeModal}>
                  <Ionicons name="md-close" size={32} color="white" />

                </TouchableOpacity>

                <View style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20
                }}>

                  <Text type='bold'>Mafia count</Text>
                  <View style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <TouchableOpacity onPress={this.decreaseMafiaCount}>
                      <MaterialCommunityIcons name="minus-circle" size={32} color="#00EB0A" />
                    </TouchableOpacity>
                    <Text style={{
                      width: 100,
                      marginLeft: 10,
                      marginRight: 10,
                      textAlign: 'center'
                    }}>
                      {mafiaCount}</Text>
                    <TouchableOpacity onPress={this.increaseMafiaCount}>
                      <MaterialCommunityIcons name="plus-circle" size={32} color="#00EB0A" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5
                }}>

                  <Text type='bold'>Round timer</Text>
                  <View style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <TouchableOpacity onPress={this.decreaseRoundTimer}>
                      <MaterialCommunityIcons name="minus-circle" size={32} color="#00EB0A" />
                    </TouchableOpacity>
                    <Text style={{
                      width: 100,
                      marginLeft: 10,
                      marginRight: 10,
                      textAlign: 'center'
                    }}>
                      {timer}</Text>
                    <TouchableOpacity onPress={this.increaseRoundTimer}>
                      <MaterialCommunityIcons name="plus-circle" size={32} color="#00EB0A" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Button onPress={this.setGameConfig}>
                  <Text>Set</Text>
                </Button>

              </View>


            </MafiaBackground>
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  playerCount: getInGamePlayers(state).length,
});

const mapDispatchToProps = dispatch => ({
  setGameConfig : (config) => dispatch(setGameConfig(config))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigureGameModal);


