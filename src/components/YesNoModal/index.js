import { Modal, View } from 'react-native';
import React from 'react';
import MafiaBackground from '../mafiaBackground';
import Button from '../button';
import Text from '../text';

export function YesNoModal({closeModal, onConfirm, question, visible}){
  return(
    <Modal
      onRequestClose={this.closeModal}
      visible={visible}
      animationType="slide"
      transparent={true}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            height: 200,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#00EB0A',
          }}>
          <MafiaBackground>
            <View
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20
              }}>
              <Text style={{ marginBottom: 10 }}>
                {question}
              </Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Button width={100} onPress={onConfirm}>
                  <Text size="small">Yes</Text>
                </Button>
                <Button width={100} onPress={closeModal}>
                  <Text size="small">No</Text>
                </Button>
              </View>
            </View>
          </MafiaBackground>
        </View>
      </View>
    </Modal>
  )
}
