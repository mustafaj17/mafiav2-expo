import MafiaBackground from '../mafiaBackground';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import Text from '../text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const TermsModal = ({ termsModalVisible, closeModal }) => (
  <Modal visible={termsModalVisible} animationType="slide">
    <MafiaBackground>
      <View style={{ paddingTop: 40, paddingLeft: 16 }}>
        <Text style={{ paddingBottom: 10 }} type="bold">
          Terms and Conditions
        </Text>
        <TouchableOpacity
          onPress={closeModal}
          style={{ position: 'absolute', top: 40, right: 16, zIndex: 2 }}>
          <Ionicons name="md-close" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }}>
        <Text type="bold" style={{ paddingTop: 10, paddingBottom: 10 }}>
          1. Terms
        </Text>
        <Text size="small" letterSpacing={1}>
          By accessing our app, Mafia, you are agreeing to be bound by these
          terms of service, all applicable laws and regulations, and agree that
          you are responsible for compliance with any applicable local laws. If
          you do not agree with any of these terms, you are prohibited from
          using or accessing Mafia. The materials contained in Mafia are
          protected by applicable copyright and trademark law.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          2. Use License
        </Text>
        <Text size="small" letterSpacing={1}>
          Permission is granted to temporarily download one copy of Mafia per
          device for personal, non-commercial transitory viewing only. This is
          the grant of a license, not a transfer of title, and under this
          license you may not:
        </Text>
        <Text size="small" letterSpacing={1}>modify or copy the materials;</Text>
        <Text size="small" letterSpacing={1}>
          use the materials for any commercial purpose, or for any public
          display (commercial or non-commercial);
        </Text>
        <Text size="small" letterSpacing={1}>
          attempt to decompile or reverse engineer any software contained in
          Mafia;
        </Text>
        <Text size="small" letterSpacing={1}>
          remove any copyright or other proprietary notations from the
          materials; or
        </Text>
        <Text size="small" letterSpacing={1}>
          transfer the materials to another person or "mirror" the materials on
          any other server.
        </Text>
        <Text size="small" letterSpacing={1}>
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Debug Digital at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          3. Disclaimer
        </Text>
        <Text size="small" letterSpacing={1}>
          The materials within Mafia are provided on an 'as is' basis. Debug
          Digital makes no warranties, expressed or implied, and hereby
          disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </Text>
        <Text size="small" letterSpacing={1}>
          Further, Debug Digital does not warrant or make any representations
          concerning the accuracy, likely results, or reliability of the use of
          the materials on its website or otherwise relating to such materials
          or on any sites linked to Mafia.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          4. Limitations
        </Text>
        <Text size="small" letterSpacing={1}>
          In no event shall Debug Digital or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use Mafia, even if Debug Digital or a Debug Digital
          authorised representative has been notified orally or in writing of
          the possibility of such damage. Because some jurisdictions do not
          allow limitations on implied warranties, or limitations of liability
          for consequential or incidental damages, these limitations may not
          apply to you.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          5. Accuracy of materials
        </Text>
        <Text size="small" letterSpacing={1}>
          The materials appearing in Mafia could include technical,
          typographical, or photographic errors. Debug Digital does not warrant
          that any of the materials on Mafia are accurate, complete or current.
          Debug Digital may make changes to the materials contained in Mafia at
          any time without notice. However Debug Digital does not make any
          commitment to update the materials.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          6. Links
        </Text>
        <Text size="small" letterSpacing={1}>
          Debug Digital has not reviewed all of the sites linked to its app and
          is not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by Debug Digital of
          the site. Use of any such linked website is at the user's own risk.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          7. Modifications
        </Text>
        <Text size="small" letterSpacing={1}>
          Debug Digital may revise these terms of service for its app at any
          time without notice. By using Mafia you are agreeing to be bound by
          the then current version of these terms of service.
        </Text>

        <Text type="bold" style={{ paddingTop: 20, paddingBottom: 10 }}>
          8. Governing Law
        </Text>
        <Text size="small" letterSpacing={1}>
          These terms and conditions are governed by and construed in accordance
          with the laws of London and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </Text>
      </ScrollView>
    </MafiaBackground>
  </Modal>
);

export default TermsModal;
