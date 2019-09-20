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
        outputRange: [20, 10],
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
        outputRange: ['#f9f9f9', '#ffffff'],
      }),
    };
    return (
      <View style={{ paddingTop: 18, width: '100%' }}>
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
            color: 'white',
            borderWidth: 1,
            borderColor: 'white',
            height: 40,
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

