import React from 'react';
import { toggleDisplayPlayerTypes, userHasSeenType } from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import { Animated, TouchableOpacity, View } from 'react-native';
import Text from '../text';

class ToggleTypeButton extends React.Component {

  constructor(props){
    super(props);
    this.isOpen = new Animated.Value(props.showPlayerTypes ? 1 : 0);
    this.runAnimation()
  }

  componentDidUpdate = () => {
    this.runAnimation()
  }


  runAnimation = () => {
    if (this.props.showPlayerTypes) {
      Animated.timing(this.isOpen, {
        toValue: 1,
        duration: 200,
      }).start();
    }else{
      Animated.timing(this.isOpen, {
        toValue: 0,
        duration: 200,
      }).start();
    }
  }

  handleTypeClick = () => {
    const { userHasSeenType, toggleDisplayPlayerTypes, userSeenType} = this.props;
    if(!userHasSeenType) {
      userSeenType();
    }
    toggleDisplayPlayerTypes();
  }

  render() {

    const bottom = this.isOpen.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0]
    })

    return (
      <Animated.View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: 80,
        position:'absolute',
        right: 10,
        bottom: bottom
      }}>

        <TouchableOpacity onPress={this.handleTypeClick}  style={{flex: 1, width:'100%'}}>
        <View style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: '#646464',
          padding: 5
        }}>
          <Text  size='small' color='white'> toggle</Text>
          <Text  size='small' color='white'> type</Text>
        </View>
        <View style={{
          width: '100%',
          flex: 1,
          backgroundColor: '#31d08a',
          height: 20
        }}>

        </View>
        </TouchableOpacity>

      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  showPlayerTypes: state.game.showPlayerTypes,
  userHasSeenType: state.game.userHasSeenType,

})

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes()),
  userSeenType : () => dispatch(userHasSeenType())

})


export default connect(mapStateToProps, mapDispatchToProps)(ToggleTypeButton);
