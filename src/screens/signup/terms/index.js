import React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import globalStyles from '../../../styles/global';
// import DisabledBack from "../../../components/disableBack";

export default class Terms extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={globalStyles.page}>
        <Text
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => this.props.navigation.goBack()}>
          Go Back (add icon to top corner)
        </Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </KeyboardAvoidingView>
    );
  }
}
