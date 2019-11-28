import {Switch, View, AsyncStorage, TouchableOpacity} from "react-native";
import Text from "../text";
import React from "react";
import Button from "../button";

const CheckTypeMessage = ({userSeenType}) => {

  const handleDoNotShowMessage = async () => {
    userSeenType();
    try {
      await AsyncStorage.setItem('hideToggleType', 'true');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      zIndex: 5
    }}>
      <View style={{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black'
      }}>
        <Text> Your type has been set</Text>
        <Text style={{marginTop: 10, marginBottom: 40}} type='light' size='small'> Click the <Text color='red' type='bold' size='small'>type</Text> toggle to show </Text>
        <TouchableOpacity onPress={handleDoNotShowMessage}>
          <Text size='xsmall' type='light' color='grey' style={{textDecorationLine: 'underline'}}>Do not show me this again.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )};

export default CheckTypeMessage;