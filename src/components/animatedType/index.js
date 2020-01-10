import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';

class AnimatedType extends React.Component {
  constructor(props) {
    super(props);
    this.top = new Animated.Value(0);
    this.rotate = new Animated.Value(1);
    this.runAnimation();
  }

  componentDidUpdate = () => {
    this.runAnimation();
  };

  runAnimation = () => {
    if (this.props.showPlayerTypes || this.props.alwaysAnimate) {
      Animated.parallel([
        // after decay, in parallel:
        Animated.timing(this.top, {
          toValue: 1,
          duration: 300,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(this.rotate, {
              // and twirl
              toValue: 2,
              duration: 200,
            }),
            Animated.timing(this.rotate, {
              // and twirl
              toValue: 0,
              duration: 400,
            }),
            Animated.timing(this.rotate, {
              // and twirl
              toValue: 1,
              duration: 200,
            }),
            Animated.timing(this.rotate, {
              // and twirl
              toValue: 1,
              duration: 200,
            }),
          ]),
        ),
      ]).start();
    } else {
      this.rotate.stopAnimation();
      Animated.sequence([
        Animated.timing(this.top, {
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 100,
        }),
      ]).start();
    }
  };

  render() {
    const height = 70;

    const top = this.top.interpolate({
      inputRange: [0, 1],
      outputRange: [height + 10, 10],
    });
    const rotate = this.rotate.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['-5deg', '0deg', '5deg'],
    });
    return (
      <Animated.View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // position: 'absolute',
          width: 70,
          height: height,
          top: top,
          left: 0,
          transform: [{ rotate: rotate }],
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  return {
    showPlayerTypes: state.game.showPlayerTypes,
  };
};

export default connect(mapStateToProps)(AnimatedType);
