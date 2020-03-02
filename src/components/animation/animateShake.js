import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

export class AnimateShake extends React.Component {
  constructor(props){
    super(props);
    this.state={
      shakeAngle: new Animated.Value(1),
    }
  }

  componentDidMount = () =>{
    this.animate();
  }

  animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.shakeAngle , {
          toValue: 2,
          duration: 350
        }),
        Animated.timing(this.state.shakeAngle , {
          toValue: 0,
          duration: 350
        }),
        Animated.timing(this.state.shakeAngle , {
          toValue: 1,
          duration: 350
        })
      ])
    ).start();
  }

  render() {

    if(!this.props.isShaking){
      return this.props.children;
    }

    const rotations = this.state.shakeAngle.interpolate({
      inputRange: [0,1,2],
      outputRange: ['-5deg', '0deg','5deg'],
    })

    return (

      <Animated.View style={{
        transform: [{ rotate: rotations}]
      }}>
        {this.props.children}
      </Animated.View>
    );
  }
}
