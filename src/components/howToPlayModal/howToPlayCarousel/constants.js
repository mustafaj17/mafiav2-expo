import { Animated, Image, View } from 'react-native';
import PlaceHolderImage from '../../../../assets/placeholder-image.png';
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
      <Text style={{ paddingTop: 20 }} letterSpacing={1}>
        You need a <Text color="#FF0000">minimum of 3 people</Text> to play this
        game and you must be <Text color="#FF0000">together.</Text>
      </Text>
    ),
  },
  {
    image: HowToPlay2,
    text: (
      <Text style={{ paddingTop: 20 }} letterSpacing={1}>
        Once the game has started, mafia and civilian types will be assigned
        randomly to each player
      </Text>
    ),
  },
  {
    image: HowToPlay3,
    text: (
      <Text style={{ paddingTop: 20 }} letterSpacing={1}>
        Mafias must work together to eliminate the civilians, whilst not
        revealing their true identity
      </Text>
    ),
  },
  {
    image: HowToPlay4,
    text: (
      <Text style={{ paddingTop: 20 }} letterSpacing={1}>
        Civilians must try to identify the mafias and eliminate them.
      </Text>
    ),
  },
  {
    text: (
      <Text style={{ paddingTop: 20 }} letterSpacing={1}>
        After each round, players will need to vote who they believe to be the
        mafia. The player with the most votes will be eliminated. This will
        continues until either team wins
      </Text>
    ),
  },
];

export const modalHome = left => ({
  image: null,
  text: (
    <>
      <MafiaTextLogo />
      <Text style={{ paddingTop: 20 }} letterSpacing={1} style={{textAlign: 'center'}}>
        Before you get started, take some time to read the instructions on how
        to play!
      </Text>
      <Animated.View
        style={{
          marginTop: 30,
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
      <Text letterSpacing={3} size='xxsmall' color='#15D600'>swipe left</Text>
    </>
  ),
});
