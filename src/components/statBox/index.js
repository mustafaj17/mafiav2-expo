import React from 'react'
import {ScrollView, View} from 'react-native';
import Text from '../../components/text'
import ProfilePicture from "../profilePicture";

export default class StatBox extends React.Component {
  render() {
    const { title, pic, players} = this.props;
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
        <ScrollView horizontal >
          {players.map(player => (
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <ProfilePicture size={50} imageUri={player[0].photoURL} />
              <Text style={{marginLeft: 4, marginRight: 4, marginTop: 8}} size='small'>{player[0].displayName}</Text>
              <Text size='xsmall'>{player[1]} votes</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}
