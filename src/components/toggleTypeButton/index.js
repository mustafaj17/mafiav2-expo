import React from 'react';
import { toggleDisplayPlayerTypes } from '../../redux/actions/gameActions';
import { connect } from 'react-redux';
import Text from '../text';
import { Animated, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

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

  render() {

    const position = -75;

    const size = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 200]
    });
    const borderRadius = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [75, 100]
    });

    const spin = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: ['45deg', '225deg']
    })
    const marginLeft = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [-30, 0]
    })
    const marginTop = this.size.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0]
    })

    return (
      <Animated.View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' ,
        flex: 1,
        position: 'absolute',
        backgroundColor: '#5538F9',
        borderWidth: 1,
        borderColor: 'white',
        bottom: position,
        right: position,
        height: size,
        width: size,
        borderRadius: borderRadius
      }}>
        <TouchableOpacity onPress={this.props.toggleDisplayPlayerTypes}  style={{flex: 1, width:'100%'}}>
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
          <AntDesign name='arrowleft' size={50} color='white' style={{}}/>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  showPlayerTypes: state.game.showPlayerTypes
})

const mapDispatchToProps = dispatch => ({
  toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes())
})


export default connect(mapStateToProps, mapDispatchToProps)(ToggleTypeButton);
