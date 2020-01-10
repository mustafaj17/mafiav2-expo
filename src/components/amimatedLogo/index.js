import React, { Component } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import logo from '../../../assets/mafia-logo-no-hat.png';
import hat from '../../../assets/mafia-logo-hat.png';

export default class AnimateLogo extends Component {
  state = {
    top: new Animated.Value(0), // Initial value for opacity: 0
    rotation: new Animated.Value(0), // Initial value for opacity: 0
  };

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          // after decay, in parallel:
          Animated.timing(this.state.top, {
            toValue: -30, // Animate to opacity: 1 (opaque)
            duration: 300,
          }),
          Animated.timing(this.state.rotation, {
            // and twirl
            toValue: 1,
            duration: 300,
          }),
        ]),
        Animated.parallel([
          // after decay, in parallel:
          Animated.timing(this.state.top, {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 300,
          }),
          Animated.timing(this.state.rotation, {
            // and twirl
            toValue: 2,
            duration: 200,
          }),
        ]),
        Animated.timing(this.state.rotation, {
          // and twirl
          toValue: 2,
          duration: 200,
        }),
      ]),
    ).start();
  }

  render() {
    let { top } = this.state;

    const spin = this.state.rotation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '180deg', '360deg'],
    });

    return (
      <View style={{ ...styles.spinnerHolder, ...this.props.style }}>
        <Animated.View
          style={{
            top: top,
            position: 'absolute',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            transform: [{ rotate: spin }],
          }}>
          <Image source={hat} style={styles.hat} />
        </Animated.View>

        <Image source={logo} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 123,
    height: 80,
    resizeMode: 'contain',
  },
  hat: {
    width: 21,
    height: 16,
    resizeMode: 'contain',
  },
});
