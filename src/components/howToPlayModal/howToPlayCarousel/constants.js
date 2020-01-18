import { Animated } from 'react-native';
import Text from '../../text';
import React from 'react';
import HowToPlay1 from '../../../../assets/how-to-play/howtoplay1.png';
import HowToPlay2 from '../../../../assets/how-to-play/howtoplay2.png';
import HowToPlay3 from '../../../../assets/how-to-play/howtoplay3.png';
import HowToPlay4 from '../../../../assets/how-to-play/howtoplay4.png';
import { Ionicons } from '@expo/vector-icons';
import MafiaTextLogo from '../../mafiaTextLogo';

export const slideData = [
  {
    image: HowToPlay1,
    text: (
      <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
        You need a <Text color="#00EB0A">minimum of 3 people</Text> to play this
        game and you must be <Text color="#00EB0A">together.</Text>
      </Text>
    ),
  },
  {
    image: HowToPlay2,
    text: (
      <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
        Once the game has started, Mafias and Civilians will be assigned
        randomly to each player.
      </Text>
    ),
  },
  {
    image: HowToPlay3,
    text: (
      <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
        Mafias must work together to eliminate the civilians, whilst not
        revealing their true identity.
      </Text>
    ),
  },
  {
    image: HowToPlay4,
    text: (
      <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
        Civilians must try to identify the mafias and eliminate them.
      </Text>
    ),
  },
  {
    text: (
      <>
          <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
            After each round, players will need to vote who they believe to be the mafia.
          </Text>
          <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
            The player with the most votes will then be eliminated. This will continues until either team wins.
          </Text>
          <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1}>
            Don't forget to hide your phone from other players :D
          </Text>
      </>
    ),
  },
];

export const modalHome = left => ({
  image: null,
  text: (
    <>
      <MafiaTextLogo />
      <Text style={{ paddingTop: 20, textAlign: 'center' }} letterSpacing={1} >
        Before you get started, take some time to read the instructions on how
        to play!
      </Text>
      <Animated.View
        style={{
          marginTop: 50,
          marginLeft: left,
          display: 'flex',
          flexDirection: 'row',
          width: 200,
          justifyContent: 'space-between',
        }}>
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
      </Animated.View>
      <Text letterSpacing={3} size='xxsmall' color='#15D600' >swipe left</Text>
    </>
  ),
});
