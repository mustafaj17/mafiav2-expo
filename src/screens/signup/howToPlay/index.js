import {View, Dimensions, StyleSheet, Image} from "react-native";

import Carousel from 'react-native-snap-carousel';
import React from 'react'
import MafiaBackground from "../../../components/mafiaBackground";
import Text from "../../../components/text";
import { slideData } from "./constants";

const horizontalMargin = 20;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

class HowToPlay extends React.Component {

  state = { currentIndex: 0 };

  renderItem = ({item, index}) => (
    <View style={{width: itemWidth, flex: 1, paddingHorizontal: horizontalMargin }}>
      <View style={{width: slideWidth, flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        {item.image && <Image source={item.image} style={{height: 200, width: slideWidth}} />}
        {item.text}
      </View>
    </View>
  );

  onSnapItem = (index) => {
    this.setState({currentIndex: index})
  };

  renderProgressBar = () => {
    const { currentIndex }  = this.state;
    const loader = 'MAFIA'.split('');
    return loader.map((letter, key) => {
      const isCurrent = currentIndex === key;

      return <View key={key} style={{
        height: isCurrent ? 18 : 12,
        width: isCurrent ? 18 : 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        margin: 6,
        borderColor: '#00EB0A',
        borderWidth: isCurrent ? 0 : 2,
      }}>
        {isCurrent && <Text size='xsmall' type='bold' color='#00EB0A' style={{marginLeft: 2, marginTop: -6.5}}>{letter}</Text>}
      </View>}
    )
  };


  render() {
    const { skipInstructions, isModal } = this.props;
    const { currentIndex } = this.state;
    const carouselDone = currentIndex === slideData.length - 1;

    return (
      <MafiaBackground>
        <View style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          borderColor: '#00EB0A',
          borderWidth: isModal ? 1 : 0,
          borderRadius: 4
        }}>
          {/* may wanna do the header below differently */}
          <Text style={{marginTop: 10}}>How to play</Text>
          <Carousel
            onSnapToItem={this.onSnapItem}
            renderItem={this.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            data={slideData}
            removeClippedSubviews={false}
          />

          <View style={{position: 'absolute', bottom: 20, justifyContent: 'center', alignItems: 'center'}}>

            {
              isModal &&
              <Text
                onPress={skipInstructions}
                size={carouselDone ? 'small' : 'xsmall'}
                color='#00EB0A'
                type={carouselDone ? 'bold' : 'regular'}
                style={{textDecorationLine: carouselDone ? 'none' : 'underline'}}
              >
                {carouselDone ? 'Done' : 'Skip'}
              </Text>
            }

            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
              {this.renderProgressBar()}
            </View>

          </View>
        </View>
      </MafiaBackground>
    );
  }
}

export default HowToPlay;
