import { Modal, View } from 'react-native';
import HowToPlayCarousel from "./howToPlayCarousel";
import React from "react";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const HowToPlayModal = ({visible, isHowToPlayAction, closeModal}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 20 + getStatusBarHeight(),
        backgroundColor: 'rgba(0,0,0, 0.7)',
      }}>
      <HowToPlayCarousel
        isHowToPlayAction={isHowToPlayAction}
        skipInstructions={closeModal}
      />
    </View>
  </Modal>
)

export default HowToPlayModal;
