import React from 'react'
import { View } from 'react-native';
import Text from '../../components/text'
import ProfilePicture from "../profilePicture";

export default class StatBox extends React.Component {
  render() {
    const { title, name, number, pic} = this.props;
    return (
      <View style={{
        display: 'flex',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e2e2',
        height: 150,
        overflow: 'hidden',
        marginBottom: 10,
        width: '100%',
        flex: 1
      }}>
        <View style={{backgroundColor: '#eeeeee', padding: 4, marginBottom: 4, width: '100%' }}>
          <Text style={{letterSpacing: 2, textAlign: 'center'}}>{title}</Text>
        </View>
        <ProfilePicture size={50} imageUri={pic} />
        <Text style={{marginLeft: 4, marginRight: 4, marginTop: 8}} size='small'>{name}</Text>
        <Text size='xsmall'>{number} votes</Text>
      </View>
    )
  }
}
