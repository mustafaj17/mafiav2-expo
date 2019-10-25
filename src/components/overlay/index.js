import React from 'react'
import {Animated} from "react-native";

export default class Overlay extends React.Component {
  state={
    fadeAnim:  new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0.7,
        duration: 500,
      }
    ).start();
  }

  componentWillUnmount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 2000,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={{position:'absolute', backgroundColor: 'black', opacity: this.state.fadeAnim, height: '100%', width: '100%' }} />


    )
  }
}
