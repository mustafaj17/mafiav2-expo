import React from 'react'
import { View } from 'react-native';
import Text from '../../components/text'
import ProfilePicture from "../profilePicture";

export default class StatBox extends React.Component {
  render() {
    const { title, name, number, pic} = this.props;
    return (
      <View style={{ display: 'flex',         shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
        <View style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor:'white',
          borderWidth: 1,
          borderColor: '#e2e2e2',
          borderRadius: 4,
          height: 150,
          width: 150,
          overflow: 'hidden',
          marginRight: 10,
        }}>
          <View style={{backgroundColor: '#eeeeee', padding: 4, marginBottom: 4, width: '100%' }}>
            <Text style={{letterSpacing: 2, textAlign: 'center'}}>{title}</Text>
          </View>
          <ProfilePicture size={50} imageUri={pic} />
          <Text size='small'>{name}</Text>
          <Text size='small'>{number} votes</Text>
        </View>
      </View>
    )
  }
}
