import React from 'react'
import {Modal, View} from "react-native";
import Text from "../text";
import Button from "../button";
import PropTypes from "prop-types";

const ModalConfirm = ({visible, onConfirm, onCancel}) => {
  const confirm = () => {
    onConfirm();
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
          height: 200,
          padding: 20,
          borderRadius: 4,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'black'
        }}>
          <Text style={{marginBottom: 10}}>Are you sure you want to sign out?</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Button width={100} onPress={confirm}>
              <Text size='small'>Yes</Text>
            </Button>
            <Button width={100} onPress={onCancel}>
              <Text size='small'>No</Text>
            </Button>
          </View>
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