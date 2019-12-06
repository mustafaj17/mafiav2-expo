import React from 'react'
import {Image, View} from 'react-native';
import Text from '../../components/text'
import ProfilePicture from "../profilePicture";
import {TYPE} from "../../constants";
import mafiaIcon from '../../../assets/mafia-type-icon.png';
import civIcon from '../../../assets/civilian-type-icon.png';;


const StatBox = ({title, players}) => {
  console.log('**********players', players)
  if (!players.length) return null;
  return (
    <View style={{
      display: 'flex',
      marginBottom: 10,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      overflow: 'hidden',
      width: '100%',
      flex: 1
    }}>
      <View style={{
        backgroundColor: '#eeeeee',
        padding: 4,
        marginBottom: 4,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
      }}>
        <Text style={{letterSpacing: 2}}>{title}</Text>
      </View>
      {players.map(player => (
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 6, justifyContent: 'center'}}>
          <ProfilePicture size={45} imageUri={player[0].photoURL} />
          <View style={{marginLeft: 12, justifyContent: 'center'}}>
            <Text size='small'>{player[0].displayName}</Text>
            <Text size='xsmall'>{player[1]} votes</Text>
          </View>
          <Image source={player[0].type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
                 resizeMode='contain'
                 style= {{height: 40, width: 40, marginLeft: 'auto'}}/>
        </View>
      ))}
    </View>
  )
};

export default StatBox;
