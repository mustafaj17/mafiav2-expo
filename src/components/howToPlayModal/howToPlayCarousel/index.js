import {View, Dimensions, StyleSheet, Image, Animated, TouchableOpacity} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import React from 'react';
import MafiaBackground from '../../mafiaBackground';
import Text from '../../text';
import { slideData, modalHome } from './constants';
import {Ionicons} from "@expo/vector-icons";
import Button from "../../button";

const horizontalMargin = 20;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

class HowToPlayCarousel extends React.Component {
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
            resizeMode='contain'
            style={{ height: 210, width: 240 }}
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
    const { isHowToPlayAction } = this.props;
    const progressText = isHowToPlayAction ? 'MAFIA' : ' MAFIA';
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
            <Text size="xsmall" type="bold" color="#15D600">
              {letter}
            </Text>
          ) : (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: '#15D600',
              }}
            />
          )}
        </View>
      );
    });
  };

  render() {
    const { skipInstructions, isHowToPlayAction } = this.props;
    const { currentIndex, left } = this.state;
    const data = !isHowToPlayAction ? [modalHome(left), ...slideData] : slideData;
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
            borderWidth: 1,
            borderRadius: 4,
            overflow: 'hidden'
          }}>
          {isHowToPlayAction && (
            <>
              <TouchableOpacity
                onPress={skipInstructions}
                style={{ position: 'absolute', top: 8, right: 15, zIndex: 30 }}>
                <Ionicons name="md-close" size={32} color="white" />
              </TouchableOpacity>

              <Text type='bold' style={{ marginTop: 10 }}>
                HOW TO PLAY
              </Text>
            </>
          )}
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
            {!isHowToPlayAction && (carouselDone ?
              <Button
                width={100}
                onPress={skipInstructions}>
                <Text size='small'>OK</Text>
              </Button>
              :
              <Text
                onPress={skipInstructions}
                size={'xsmall'}
                color="#00EB0A"
                type={'regular'}
                style={{ textDecorationLine: 'underline' }}>
                Skip
              </Text>)
            }

            {(currentIndex !== 0 || isHowToPlayAction) &&
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
            }
          </View>
        </View>
      </MafiaBackground>
    );
  }
}

export default HowToPlayCarousel;
