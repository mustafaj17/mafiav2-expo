import {Text, View, Dimensions, StyleSheet} from "react-native";

import Carousel from 'react-native-snap-carousel';
import React from 'react'
import MafiaBackground from "../../../components/mafiaBackground";

const horizontalMargin = 20;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 400;

const HowToPlay = () => {
  const _renderItem = ({item, index}) => (
    <View style={{width: itemWidth, height: itemHeight, paddingHorizontal: horizontalMargin}}>
      <View style={{width: slideWidth, flex: 1, backgroundColor: 'whitesmoke'}} >
        <Text>{item}</Text>
      </View>
    </View>
  );

  return (
    <MafiaBackground>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <View style={{height: '50%'}}>
          <Carousel
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            data={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
            removeClippedSubviews={false}
          />
        </View>
      </View>
    </MafiaBackground>
  );
};

export default HowToPlay;