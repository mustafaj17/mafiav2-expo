import React from 'react';
import { TYPE } from '../../constants';
import { View, Image, TouchableOpacity } from 'react-native';
import { getCurrentPlayer } from '../../redux/selectors';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons'
import mafiaIcon from '../../../assets/mafia-icon3.png';
import civIcon from '../../../assets/civilian-icon.png';
import AnimatedType from '../animatedType';
import { setModalData } from '../../redux/actions/modalActions';
import Player from './Player';
import Text from '../text';

export class PlayerWithToggleType extends React.Component{


  openPlayerInfoModal = () => {

    const { setModalData, player } = this.props;

    this.elem.measure( (fx, fy, width, height, px, py) => {
      // console.log('Component width is: ' + width)
      // console.log('Component height is: ' + height)
      // console.log('X offset to page: ' + px)
      // console.log('Y offset to page: ' + py)

      setModalData({
        top:py,
        left:px,
        height,
        width
      }, player)
    })
  }

  getPlayerType = () => {

    const { player, currentPlayer } = this.props;
    const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
    const playerMatch = currentPlayer && (currentPlayer.uid === player.uid);

    const playerType = (
      <View style={{ marginLeft: 'auto', marginRight: 10 }}>
        <AnimatedType>
          <Image source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
                 resizeMode='contain'
                 style= {{flex:1 , width: '100%' }}/>
        </AnimatedType>
      </View>);

    if(currentPlayerIsCivilian) {
      if(playerMatch) {
        return playerType;
      }
      return null;
    }

    if(player.type !== TYPE.CIVILIAN) {
      return playerType;
    }else{
      return null;
    }
  }

  render = () => {

    const { player } = this.props;

    return(
      <TouchableOpacity onPress={this.openPlayerInfoModal} ref={ elem => this.elem = elem}>
        <Player player={player} >

          {player.ready &&
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 5,
              top: 2,
              zIndex:10
              // backgroundColor: '#008165',
              // borderRadius: 15

            }}>
            <Text size='xsmall' color='#00FFC2' style={{marginRight: 5}}>ready</Text>
            <FontAwesome name='check-circle' color='#00FFC2' size={18}/>
          </View>}

          {this.getPlayerType()}
        </Player>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: getCurrentPlayer(state),
    showPlayerTypes: state.game.showPlayerTypes
  }
}

const mapDispatchToProps = dispatch => ({
  setModalData : (data, player) => dispatch(setModalData(data, player))
})

PlayerWithToggleType.defaultProps = {
  currentPlayer: false
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerWithToggleType);

