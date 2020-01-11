import { Animated, Image } from 'react-native';
import PlaceHolderImage from '../../../../assets/placeholder-image.png';
import Text from '../../text';
import React from 'react';
import arrowRight from '../../../../assets/arrow-right.jpg';
import { Ionicons } from '@expo/vector-icons';
import MafiaLogo from '../../mafiaLogo';

export const slideData = [
  {
    image: PlaceHolderImage,
    text: (
      <Text style={{ paddingTop: 20 }}>
        You need a <Text color="#FF0000">minimum of 3 people</Text> to play this
        game and you must be <Text color="#FF0000">together.</Text>
      </Text>
    ),
  },
  {
    image: PlaceHolderImage,
    text: (
      <Text style={{ paddingTop: 20 }}>
        Once the game has started, mafia and civilian types will be assigned
        randomly to each player
      </Text>
    ),
  },
  {
    image: PlaceHolderImage,
    text: (
      <Text style={{ paddingTop: 20 }}>
        Mafias must work together to eliminate the civilians, whilst not
        revealing their true identity
      </Text>
    ),
  },
  {
    image: PlaceHolderImage,
    text: (
      <Text style={{ paddingTop: 20 }}>
        Civilians must try to identify the mafias and eliminate them.
      </Text>
    ),
  },
  {
    text: (
      <Text style={{ paddingTop: 20 }}>
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
      <Text size="large" type="bold" style={{ paddingBottom: 60 }}>
        Welcome to Mafia
      </Text>
      <MafiaLogo />
      <Text style={{ paddingTop: 20 }} letterSpacing={1}>
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
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
        <Ionicons name="md-arrow-dropleft" size={40} color="#15D600" />
      </Animated.View>
      <Text letterSpacing={3} size='xxsmall' color='#15D600'>swipe left</Text>
    </>
  ),
});
