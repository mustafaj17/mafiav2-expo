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
    this.rotate = new Animated.Value(0);
    this.opacity = new Animated.Value(0);
  }

  componentDidMount = () => {
    Animated.sequence([
        Animated.timing(this.rotate, {
          toValue: 0,
          duration: 200
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 2,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 2,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.rotate, {
          toValue: 0,
          duration: 300
        }),
      ]
    ).start( () => {
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 500
      }).start()
    });
  }

  render() {
    const { player } = this.props;

    const rotate = this.rotate.interpolate({
      inputRange: [0,1,2],
      outputRange: ['0deg', '180deg','360deg']
    })

    const typeOpacity = this.opacity.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })

    const questionMarkOpacity = this.opacity.interpolate({
      inputRange: [0,1],
      outputRange: [1, 0]
    })

    return (
      <>
        <Text size='large' type='bold' letterSpacing={4}>Out</Text>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#d9d9d9',
          backgroundColor: 'white',
          borderRadius: 4,
          borderWidth: 1,
          padding: 40,
          margin: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}>

          <ProfilePicture imageUri={player.photoURL}/>

          <Text style={{marginTop: 10,marginBottom: 10}} >{player.displayName}</Text>

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
            // position: 'absolute',
            // top: 0,
            // right: -20,
            // zIndex: 2,
            transform: [
              {rotateY: rotate},
            ]
          }}>

            <Animated.View style={{
              height : 70,
              width: 70,

              position: 'absolute',
              top: 0,
              left: 0,
              opacity: typeOpacity
            }}>
              <Image source={this.props.player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
                     resizeMode='contain'
                     style= {{flex:1 , width: '100%', borderRadius: 35 }}/>
            </Animated.View>

            <Animated.View style={{
              height : 70,
              width: 70,
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: questionMarkOpacity
            }}>
              <Image source={questionMark}
                     resizeMode='contain'
                     style= {{flex:1 , width: '100%',borderRadius: 35 }}/>
            </Animated.View>

          </Animated.View>

        </View>
      </>
    );
  }
}

export default PlayerOut;
