import React from 'react';
import { Image, View, Animated } from 'react-native';
import Text from '../text';
import ProfilePicture from '../profilePicture';
import { TYPE } from '../../constants';
import civIcon from '../../../assets/civilian-icon.png';
import mafiaIcon from '../../../assets/mafia-icon.png';
import { LinearGradient } from 'expo-linear-gradient';

class PlayerOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showType: false,
    };
    this.opacityTop = new Animated.Value(0);
    this.opacityMiddle = new Animated.Value(0);
    this.opacityBottom = new Animated.Value(0);
  }

  componentDidMount = () => {
    Animated.sequence([
      Animated.timing(this.opacityTop, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.opacityMiddle, {
        toValue: 1,
        duration: 500,
      }),
      Animated.timing(this.opacityBottom, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  };

  render() {
    const { player } = this.props;

    const topOpacity = this.opacityTop.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const middleOpacity = this.opacityMiddle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const bottomOpacity = this.opacityBottom.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Animated.View style={{ opacity: topOpacity }}>
          <ProfilePicture size={150} imageUri={player.photoURL} />
        </Animated.View>

        <Animated.View style={{ opacity: middleOpacity }}>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>
            {player.displayName}
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 250,
            width: '100%',
            opacity: bottomOpacity,
          }}>
          {player.type === TYPE.MAFIA ? (
            <Text color="#FF0000">MAFIA ELIMINATED</Text>
          ) : (
            <Text color="#0089FF">CIVILIAN ELIMINATED</Text>
          )}
          <LinearGradient
            start={{ x: 0, y: -0.5 }}
            end={{ x: 0, y: 1 }}
            colors={
              player.type === TYPE.MAFIA
                ? ['#811C24', '#DB1C24']
                : ['#0000FF', '#000054']
            }
            style={{
              flex: 1,
              width: '100%',
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 150,
                width: 150,
              }}>
              <Image
                source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
                resizeMode="contain"
                style={{ flex: 1, width: '100%' }}
              />
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default PlayerOut;
