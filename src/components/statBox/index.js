import React from 'react';
import { Image, View } from 'react-native';
import Text from '../../components/text';
import ProfilePicture from '../profilePicture';
import { TYPE } from '../../constants';
import mafiaIcon from '../../../assets/mafia-type-icon.png';
import civIcon from '../../../assets/civilian-type-icon.png';

const StatBox = ({ title, players = [] }) => {
  if (!players.length) return null;
  return (
    <View
      key={title}
      style={{
        backgroundColor: '#1A1A1A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          marginBottom: 10,
        }}>
        <Text color="white" type="bold">
          {title}
        </Text>
      </View>

      <View style={{ minWidth: 200 }}>
        {players.map((player, index) => (
          <View
            key={index}
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
            <ProfilePicture size={45} imageUri={player[0].photoURL} />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text size="small">{player[0].displayName}</Text>
              <Text size="xxsmall" color="#00EB0A">
                {player[1]} votes
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StatBox;
