import React from 'react';
import { Image, View } from 'react-native';
import Text from '../text';
import ProfilePicture from '../profilePicture';
import { Animated } from 'react-native';
import { TYPE } from '../../constants';
import civIcon from '../../../assets/civilian-icon.png';
import mafiaIcon from '../../../assets/mafia-icon3.png';
import questionMark from '../../../assets/question-mark.png';
import InfoText from '../infoBox';

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
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 2,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 0,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 2,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 1,
          duration: 400
        }),
        Animated.timing(this.rotate, {
          toValue: 0,
          duration: 400
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
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%'}}>
        <InfoText style={{marginBottom: 10}}>
          <Text size='large' >Voted out</Text>
        </InfoText>

        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >

          <ProfilePicture imageUri={player.photoURL}/>

          <Text style={{marginTop: 10}} >{player.displayName}</Text>

          <Animated.View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' ,
            height : 70,
            width: 70,
            position: 'absolute',
            top: 0,
            right: -20,
            zIndex: 2,
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

      </View>
    );
  }
}

export default PlayerOut;
