import { View, Dimensions, StyleSheet, Image, Animated } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import React from 'react';
import MafiaBackground from '../../../components/mafiaBackground';
import Text from '../../../components/text';
import { slideData, modalHome } from './constants';

const horizontalMargin = 20;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

class HowToPlay extends React.Component {
  state = {
    currentIndex: 0,
    left: new Animated.Value(30), // Initial value for opacity: 0
  };

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.left, {
          toValue: -30, // Animate to opacity: 1 (opaque)
          duration: 500,
        }),
        Animated.timing(this.state.left, {
          // and twirl
          toValue: 30,
          duration: 500,
        }),
      ]),
    ).start();
  }

  renderItem = ({ item, index }) => (
    <View
      style={{
        width: itemWidth,
        flex: 1,
        paddingHorizontal: horizontalMargin,
      }}>
      <View
        style={{
          width: slideWidth,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {item.image && (
          <Image
            source={item.image}
            style={{ height: 200, width: slideWidth }}
          />
        )}
        {item.text}
      </View>
    </View>
  );

  onSnapItem = index => {
      this.setState({ currentIndex: index });
  };

  renderProgressBar = () => {
    const { currentIndex } = this.state;
    const { isModal } = this.props;
    const progressText = isModal ? ' MAFIA' : 'MAFIA';
    const progressArray = progressText.split('');

    return progressArray.map((letter, key) => {
      const isPassed = key <= currentIndex;
      if (letter === ' ') return;
      return (
        <View
          key={key}
          style={{
            height: 20,
            width: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isPassed ? (
            <Text size="xsmall" type="bold" color="#00EB0A">
              {letter}
            </Text>
          ) : (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                borderColor: '#00EB0A',
                borderWidth: 2,
              }}
            />
          )}
        </View>
      );
    });
  };

  render() {
    const { skipInstructions, isModal } = this.props;
    const { currentIndex, left } = this.state;
    const data = isModal ? [modalHome(left), ...slideData] : slideData;
    const carouselDone = currentIndex === data.length-1;

    return (
      <MafiaBackground>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            borderColor: '#00EB0A',
            borderWidth: isModal ? 1 : 0,
            borderRadius: 4,
          }}>
          {!isModal && <Text style={{ marginTop: 10 }}>How to play</Text>}
          <Carousel
            onSnapToItem={this.onSnapItem}
            renderItem={this.renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            data={data}
            removeClippedSubviews={false}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isModal && currentIndex !== 0 && (
              <Text
                onPress={skipInstructions}
                size={carouselDone ? 'small' : 'xsmall'}
                color="#00EB0A"
                type={carouselDone ? 'bold' : 'regular'}
                style={{
                  textDecorationLine: carouselDone ? 'none' : 'underline',
                }}>
                {carouselDone ? 'Done' : 'Skip'}
              </Text>
            )}

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                width: 160,
                justifyContent: 'space-between',
              }}>
              {this.renderProgressBar()}
            </View>
          </View>
        </View>
      </MafiaBackground>
    );
  }
}

export default HowToPlay;
