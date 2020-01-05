import { View, AsyncStorage, Modal, Image } from "react-native";
import Text from "../text";
import React from "react";
import Button from "../button";
import {LinearGradient} from "expo-linear-gradient";
import mafiaIcon from "../../../assets/mafia-icon.png";
import civIcon from "../../../assets/civilian-icon.png";

const CheckTypeMessage = ({userSeenType, hideMessage}) => {

  const handleDoNotShowMessage = async () => {
    userSeenType();
    try {
      await AsyncStorage.setItem('hideToggleType', 'true');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Modal visible transparent animationType="slide">
      <View style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(77,77,77, 0.99)',
        paddingTop: 40,
        paddingBottom: 40,
      }}>

        <Text size='large' type='bold'> LET'S PLAY</Text>
        <View style={{padding: 10}}>
          <Text>CHECK IF YOU ARE A <Text color='red'>MAFIA</Text> OR <Text color='blue'>CIVILIAN</Text> BY PRESSING THE SHOW TYPE BUTTON IN THE BOTTOM RIGHT CORNER</Text>
        </View>

        <View style={{width: '100%'}}>
          <LinearGradient
            start={{x: 0, y: -0.5}} end={{x: 0, y: 1}}
            colors={['#811C24', '#DB1C24']}
            style={{
              width: '100%',
              display: 'flex',
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'center',
              alignItems: 'center' ,
              position: 'relative',
              flexDirection: 'row'
            }}>
            <Image source={mafiaIcon}
                   resizeMode='contain'
                   style= {{
                     height: 150,
                     width: 150,
                   }}/>
            <View style={{width: '60%'}}>
              <Text size='xxsmall' style={{marginBottom:10}}>
                IF YOU ARE A MAFIA YOU WILL BE ABLE TO SEE OTHER MAFIAS - YOU MUST TRICK EVERYONE INTO BELIEVING YOU ARE A CIVILIAN - WORK WITH OTHER MAFIAS TO ELIMINATE ALL THE CIVILIANS
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: -0.5}} end={{x: 0, y: 1}}
            colors={['#0000FF', '#000054']}
            style={{
              width: '100%',
              display: 'flex',
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'center',
              alignItems: 'center' ,
              position: 'relative',
              flexDirection: 'row'
            }}>
            <Image source={civIcon}
                   resizeMode='contain'
                   style= {{
                     height: 150,
                     width: 150,
                   }}/>
            <View style={{width: '60%'}}>
              <Text size='xxsmall' style={{marginBottom:10}}>
                IF YOU ARE A CIVILIAN YOU MUST TRY TO FIND AND ELIMINATE THE MAFIAS - BE SMART AND PAY ATTENTION TO SEE WHO IS ACTING STRANGELY
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', width: '99%', justifyContent: 'space-around', alignItems: 'center'}}>
          <Button onPress={handleDoNotShowMessage} margin={2}>
            <Text size='xsmall' color='white' width='100%'>DON'T SHOW AGAIN</Text>
          </Button>
          <Button secondary onPress={hideMessage} width={100} margin={2}>
            <Text size='xsmall'>OK</Text>
          </Button>
        </View>

      </View>
    </Modal>
  )};

export default CheckTypeMessage;