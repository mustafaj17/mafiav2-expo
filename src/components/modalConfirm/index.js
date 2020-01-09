import React from 'react'
import {Modal, View} from "react-native";
import Text from "../text";
import Button from "../button";
import PropTypes from "prop-types";
import MafiaBackground from '../mafiaBackground';

const ModalConfirm = ({visible, onConfirm, onCancel}) => {
  const confirmAndClose = () => {
    onConfirm();
    onCancel();
  };

  return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '80%',
          height: 170,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#00EB0A'
        }}>
          <MafiaBackground style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20
            }}>
            <Text style={{marginBottom: 10}}>Are you sure you want to sign out?</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button width={100} onPress={confirmAndClose}>
                <Text size='small'>Yes</Text>
              </Button>
              <Button width={100} onPress={onCancel}>
                <Text size='small'>No</Text>
              </Button>
            </View>
            </View>
          </MafiaBackground>
        </View>
      </View>
    </Modal>
  )
};

ModalConfirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ModalConfirm;
