import { Animated, Image, Modal, View, TouchableOpacity } from 'react-native';
import civIcon from '../../../assets/civilian-icon.png';
import civIconOutline from '../../../assets/civilian-icon-outline.png';
import mafiaIcon from '../../../assets/mafia-icon.png';
import mafiaIconOutline from '../../../assets/mafia-icon-outline.png';
import React from 'react';
import MafiaBackground from '../mafiaBackground';
import Text from '../text';

class RevealTypeModal extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      heading: 'CHARACTER SET',
      subHeading: 'HIDE YOUR PHONE',
      btnText: 'REVEAL YOUR CHARACTER',
      characterRevealed: false,
      isRevealing: false
    }

    this.mafiaOpacity= new Animated.Value(0);
    this.civOpacity= new Animated.Value(0);
    this.mafiaOutlineLeft= new Animated.Value(0);
    this.civOutlineRight= new Animated.Value(0);
    this.outlineOpacity= new Animated.Value(1);
  }

  revealCharacter = () => {
    this.setState({isRevealing: true})
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.mafiaOutlineLeft, {
          toValue: 1,
          duration: 400,
        }),
        Animated.timing(this.civOutlineRight, {
          toValue: 1,
          duration: 400,
        })
      ]),
      Animated.parallel([
        Animated.timing(this.mafiaOutlineLeft, {
          toValue: 2,
          duration: 1000,
        }),
        Animated.timing(this.civOutlineRight, {
          toValue: 2,
          duration: 1000,
        })
      ]),
      Animated.parallel([
        Animated.timing(this.outlineOpacity, {
          toValue: 0,
          duration: 500,
        }),
        Animated.timing(this.civOpacity, {
          toValue: this.props.isMafia ? 0 : 1,
          duration: 500,
        }),
        Animated.timing(this.mafiaOpacity, {
          toValue: this.props.isMafia ? 1 : 0,
          duration: 500,
        })
      ])
    ]).start( () => {
      this.setState({characterRevealed: true, isRevealing: false})
    })
  }

  render() {

    const { heading, subHeading, btnText, isRevealing} = this.state;

    const mafiaOpacity = this.mafiaOpacity.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })

    const civOpacity = this.civOpacity.interpolate({
      inputRange: [0,1],
      outputRange: [0, 1]
    })

    const mafiaOutlineLeft = this.mafiaOutlineLeft.interpolate({
      inputRange: [0,1, 2],
      outputRange: [-125, 125, 0]
    })

    const civOutlineRight = this.civOutlineRight.interpolate({
      inputRange: [0,1, 2],
      outputRange: [-125, 125, 0]
    })

    const outlineOpacity = this.outlineOpacity.interpolate({
      inputRange: [0,1],
      outputRange: [0, 0.8]
    })

    const { characterRevealed } = this.state;
    const { isMafia, closeModal } = this.props;

    return (
      <Modal visible={true}>
        <MafiaBackground>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
              width: '100%',
              marginBottom: 50,
              position: 'relative'
            }}>
              {!isRevealing &&
              <Animated.View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: characterRevealed ? 0 : 1 , position: 'absolute'}}>
                <Text size='xlarge' type='bold' style={{fontSize: 32}}>{heading}</Text>
                <Text color='#00EB0A'type={'bold'} size='small'>{subHeading}</Text>
              </Animated.View>
              }

              <Animated.View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: characterRevealed ? 1 : 0 , position: 'absolute'}}>
                <Text type='bold' style={{fontSize: 32}}>
                  You're a {isMafia ?
                  <Text color='#FF0000' type='bold' style={{fontSize: 32}}>Mafia</Text>:
                  <Text color='#0089FF' type='bold' style={{fontSize: 32}}>Civilian</Text>
                }
                </Text>
              </Animated.View>

            </View>

            <View style={{
              width: 250,
              marginBottom: 50,
              display: 'flex',
              height: 250,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'relative'
            }}>

              <Animated.View style={{ width: 250, height: 250, position: 'absolute', left: mafiaOutlineLeft, opacity: outlineOpacity}}>
                <Image
                  source={mafiaIconOutline}
                  resizeMode="contain"
                  style={{ flex: 1, width: '100%' }}/>
              </Animated.View>

              <Animated.View style={{ width: 250, height: 250, position: 'absolute', right: civOutlineRight, opacity: outlineOpacity}}>
                <Image
                  source={civIconOutline}
                  resizeMode="contain"
                  style={{ flex: 1, width: '100%' }}/>
              </Animated.View>

              <View style={{height:250, width: 250, position: 'relative'}}>
                <Animated.View style={{ width: 250,height: 250, position: 'absolute', opacity: civOpacity}}>
                  <Image
                    source={civIcon}
                    resizeMode="contain"
                    style={{ flex: 1, width: '100%' }}/>
                </Animated.View>

                <Animated.View style={{ width: 250,height: 250, position: 'absolute', opacity: mafiaOpacity}}>
                  <Image
                    source={mafiaIcon}
                    resizeMode="contain"
                    style={{ flex: 1, width: '100%' }}/>
                </Animated.View>
              </View>

            </View>

            <View style={{ height: 150 }}>
              {!isRevealing && !characterRevealed &&
              <TouchableOpacity onPress={this.revealCharacter}>
                <View style={{ backgroundColor: '#00EB0A', padding: 20, margin: 20 }}>
                  <Text type='bold' color='black' size='xsmall'>{btnText}</Text>
                </View>
              </TouchableOpacity>
              }

              {!isRevealing && characterRevealed &&
              <TouchableOpacity onPress={closeModal}>
                <View style={{ backgroundColor: '#00EB0A', padding: 20, margin: 20, width: 280,
                  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Text type='bold' color='black' >PLAY</Text>
                </View>
              </TouchableOpacity>
              }
            </View>


          </View>
        </MafiaBackground>
      </Modal>
    )
  }
}

export default RevealTypeModal
