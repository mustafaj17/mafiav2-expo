import React from 'react';
import { Image, View, Animated } from 'react-native';
import Text from '../text';
import ProfilePicture from '../profilePicture';
import { TYPE } from '../../constants';
import civIcon from '../../../assets/civilian-icon.png';
import mafiaIcon from '../../../assets/mafia-icon3.png';
import questionMark from '../../../assets/question-mark.png';

class PlayerOut extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      showType: false
    }
    this.opacityTop = new Animated.Value(0);
    this.opacityMiddle = new Animated.Value(0);
    this.opacityBottom = new Animated.Value(0);
  }

  componentDidMount = () => {
    Animated.sequence([
      Animated.timing(this.opacityTop, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.opacityMiddle, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.opacityBottom, {
        toValue: 1,
        duration: 500
      })
    ]).start()
  }

  render() {
    const { player } = this.props;

    const topOpacity = this.opacityTop.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })

    const middleOpacity = this.opacityMiddle.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })

    const bottomOpacity = this.opacityBottom.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })


    return (
      <>
        <Text size='large' type='bold' letterSpacing={4}>Out</Text>
        <Animated.View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 40,
          margin: 20,
        }}>
          <Animated.View style={{opacity: topOpacity}}>
            <ProfilePicture imageUri={player.photoURL}/>
          </Animated.View>

          <Animated.View style={{opacity: middleOpacity}}>
            <Text style={{marginTop: 10,marginBottom: 10 }} >{player.displayName}</Text>
          </Animated.View>

          {/*<AnimatedType alwaysAnimate={true}>*/}
          {/*<Image source={this.props.player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}*/}
          {/*resizeMode='contain'*/}
          {/*style= {{flex:1 , width: '100%', borderRadius: 35 }}/>*/}
          {/*</AnimatedType>*/}

          <Animated.View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' ,
            height : 70,
            width: 70,
            opacity: bottomOpacity
          }}>

            <View style={{
              height : 70,
              width: 70,
              position: 'absolute',
              top: 0,
              left: 0,
            }}>
              <Image source={this.props.player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
                     resizeMode='contain'
                     style= {{flex:1 , width: '100%', borderRadius: 35 }}/>
            </View>
          </Animated.View>

        </Animated.View>
      </>
    );
  }
}

export default PlayerOut;
