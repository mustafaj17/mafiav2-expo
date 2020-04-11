import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

export class AnimatePulsate extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pulsate: new Animated.Value(0),
    }
  }

  componentDidMount = () =>{
    this.animate();
  }

  animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.pulsate , {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(this.state.pulsate , {
          toValue: 0,
          duration: 500
        }),
      ])
    ).start();
  }

  render() {

    const scale = this.state.pulsate.interpolate({
      inputRange: [0,1],
      outputRange: [1, 1.05],
    })
    return (

      <Animated.View style={{
        transform: [{ scale: scale }]
      }}>
          {this.props.children}
      </Animated.View>
    );
  }
}
