import {
  View,
  AsyncStorage,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '../text';
import React from 'react';
import Button from '../button';
import { LinearGradient } from 'expo-linear-gradient';
import mafiaIcon from '../../../assets/mafia-icon.png';
import civIcon from '../../../assets/civilian-icon.png';
import MafiaBackground from '../mafiaBackground';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const CheckTypeMessage = ({ userSeenType, hideMessage }) => {
  const handleDoNotShowMessage = async () => {
    userSeenType();
    try {
      await AsyncStorage.setItem('hideToggleType', 'true');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent animationType="fade">
      <View
        style={{
          flex: 1,
          width: '100%',
          padding: 12,
          paddingTop: 12 + Constants.statusBarHeight,
          backgroundColor: 'rgba(0,0,0, 0.7)',
        }}>
        <MafiaBackground
          style={{ borderRadius: 4, borderColor: '#00EB0A', borderWidth: 1 }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              onPress={hideMessage}
              style={{ position: 'absolute', top: 4, right: 10, zIndex: 2 }}>
              <Ionicons name="md-close" size={32} color="white" />
            </TouchableOpacity>

            <Text size="large" type="bold">
              LET'S PLAY
            </Text>
            <View style={{ padding: 10 }}>
              <Text>
                Check if you are{' '}
                <Text color="#FF0000" type="bold">
                  Mafia
                </Text>{' '}
                or{' '}
                <Text type="bold" color="#0089FF">
                  Civilian
                </Text>{' '}
                by pressing the show type button in the bottom right corner
              </Text>
            </View>

            <View style={{ width: '100%' }}>
              <LinearGradient
                start={{ x: 0, y: -0.5 }}
                end={{ x: 0, y: 1 }}
                colors={['#811C24', '#DB1C24']}
                style={{
                  width: '100%',
                  display: 'flex',
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  flexDirection: 'row',
                }}>
                <Image
                  source={mafiaIcon}
                  resizeMode="contain"
                  style={{
                    height: 150,
                    width: '30%',
                  }}
                />
                <View style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Text size="xsmall" >
                    If you're a Mafia you can see other Mafias -
                    You must trick everyone into believing you are a Civilian -
                    Play smart!
                  </Text>
                </View>
              </LinearGradient>

              <LinearGradient
                start={{ x: 0, y: -0.5 }}
                end={{ x: 0, y: 1 }}
                colors={['#0000FF', '#000054']}
                style={{
                  width: '100%',
                  display: 'flex',
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  flexDirection: 'row',
                }}>
                <Image
                  source={civIcon}
                  resizeMode="contain"
                  style={{
                    height: 150,
                    width: '30%',
                  }}
                />
                <View style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Text size="xsmall">
                    If you're a Civilian you must try to find and eliminate the Mafias -
                    Who's acting strange?
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '99%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text
                onPress={handleDoNotShowMessage}
                size="xsmall"
                color="#00EB0A"
                type="bold"
                width="100%"
                style={{ textDecorationLine: 'underline' }}>
                Don't show again
              </Text>
              <Button secondary onPress={hideMessage} width={100} margin={2}>
                <Text size="xsmall">OK</Text>
              </Button>
            </View>
          </View>
        </MafiaBackground>
      </View>
    </Modal>
  );
};

export default CheckTypeMessage;
