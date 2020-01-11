import {Modal, View} from "react-native";
import Constants from "expo-constants";
import HowToPlayCarousel from "./howToPlayCarousel";
import React from "react";

const HowToPlayModal = ({visible, isHowToPlay, closeModal}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 20 + Constants.statusBarHeight,
        backgroundColor: 'rgba(0,0,0, 0.7)',
      }}>
      <HowToPlayCarousel
        isHowToPlay={isHowToPlay}
        skipInstructions={closeModal}
      />
    </View>
  </Modal>
)

export default HowToPlayModal;