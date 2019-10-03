import React from 'react';
import { toggleDisplayPlayerTypes, userHasSeenType } from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import { Animated, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import Text from '../text';

class ToggleTypeButton extends React.Component {

  constructor(props){
    super(props);
    this.size = new Animated.Value(props.showPlayerTypes ? 1 : 0);
    this.runAnimation()
  }

  componentDidUpdate = () => {
    this.runAnimation()
  }


  runAnimation = () => {
    if (this.props.showPlayerTypes) {
      Animated.timing(this.size, {
        toValue: 1,
        duration: 200,
      }).start();
    }else{
      Animated.timing(this.size, {
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

    const position = -50;

    const size = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [120, 150]
    });
    const borderRadius = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 75]
    });

    const spin = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: ['45deg', '225deg']
    })
    const marginLeft = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [-25, 0]
    })
    const marginTop = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0]
    })
    const bottom = this.size.interpolate({
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
          <Text  size='small'> toggle</Text>
          <Text  size='small'> type</Text>
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

    return (
      <Animated.View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' ,
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, 0.7)',
        borderWidth: 1,
        borderColor: 'white',
        bottom: position,
        right: position,
        height: size,
        width: size,
        borderRadius: borderRadius,
        zIndex: 6
      }}>
        {/*<Text size='small' type='light' style={{position: 'absolute', top: -5, left: -20, transform: [{rotate: '-45deg'}]}}>{this.props.showPlayerTypes ? 'hide' : 'show'}</Text>*/}
        <TouchableOpacity onPress={this.handleTypeClick}  style={{flex: 1, width:'100%'}}>
          <Animated.View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            marginTop:marginTop,
            marginLeft: marginLeft,
            transform: [{
              rotate: spin
            }]
          }}>

            <AntDesign name='arrowleft' size={30} color='#31E785'/>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
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
