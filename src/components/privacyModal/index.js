import MafiaBackground from '../mafiaBackground';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import Text from '../text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const PrivacyModal = ({ privacyModalVisible, closeModal }) => (
  <Modal visible={privacyModalVisible} animationType="slide">
    <MafiaBackground>
      <View style={{ paddingTop: 40, paddingLeft: 16 }}>
        <Text style={{ paddingBottom: 10 }} type="bold">
          Privacy Policy
        </Text>
        <TouchableOpacity
          onPress={closeModal}
          style={{ position: 'absolute', top: 40, right: 16, zIndex: 2 }}>
          <Ionicons name="md-close" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }}>
        <Text size="small" style={{ paddingTop: 10, paddingBottom: 10 }}>
          Your privacy is important to us. It is Debug Digital's policy to
          respect your privacy regarding any information we may collect from you
          through our app, Mafia.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we’ll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          We don’t share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          Our app may link to external sites that are not operated by us. Please
          be aware that we have no control over the content and practices of
          these sites, and cannot accept responsibility or liability for their
          respective privacy policies.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </Text>
        <Text size="small" style={{ paddingBottom: 10 }}>
          This policy is effective as of 6 January 2020.
        </Text>
      </ScrollView>
    </MafiaBackground>
  </Modal>
);

export default PrivacyModal;
