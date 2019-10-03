import React from 'react';
import { Animated, TextInput, View } from 'react-native';

export class FloatingLabelInput extends React.Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    const isFocused = this.props.value.length > 0;
    this._animatedIsFocused = new Animated.Value(isFocused ? 1 : 0);
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  }

  handleBlur = () => {
    this.setState({ isFocused: this.props.value.length > 0 });
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label,value, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 20],
      }),
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [28, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [22, 16],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#9b9b9b', '#5a5a5a'],
      }),
    };
    return (
      <View style={{ paddingTop: 18, width: '100%', padding: 10 }}>
        <Animated.Text style={{...labelStyle, fontFamily: 'oxygen-regular'}}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          value={value}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 10,
            fontSize: 22,
            borderWidth: 1,
            padding: 10,
            fontFamily: 'oxygen-regular',
            ...props.style
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          autoCorrect={false}
          spellCheck={false}
        />
      </View>
    );
  }
}

