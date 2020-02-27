import React from 'react';
import { View, Animated } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { getCurrentPlayer } from '../../../redux/selectors';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Text from '../../../components/text';
import Button from '../../../components/button';
import PageTitle from '../../../components/pageTitle';


const hintText = [
  'Find the Mafia...',
  "or maybe you're the Mafia?",
  "Who's acting weird...?",
  "Who's hiding something...?",
  "Beware of the snakes...",
  "Look around... who's twitching?",
];

class InRound extends React.Component {
  state = {
    timer: 59,
    hintTextIndex: 0,
    hintTextOpacity: 1,
    hintText : hintText[0]
  };

  constructor(){
    super();
    this.hintTextOpacity = new Animated.Value(1);
  }

  componentDidMount() {
    this.setTimer();
    this.animateHintText()
  }


  setTimer = () => {
    this.timer = setInterval(() => {
      const newTime = this.state.timer - 1;
      if (newTime === 0) {
        this.endRound();
      } else {
        this.setState({ timer: newTime });
      }
    }, 1000);
  };

  animateHintText = () => {
    const {hintTextIndex, hintTextOpacity} = this.state;
    Animated.sequence([
      Animated.delay(4000),
      Animated.timing(this.hintTextOpacity, {
        toValue: hintTextOpacity ? 0 : 1,
        duration: 200
      })
    ]).start( ()=> {
      if(hintTextOpacity) {
        const newHintTextIndex = hintTextIndex === hintText.length - 1 ? 0 : hintTextIndex + 1;
        this.setState({
          hintTextIndex: newHintTextIndex,
          hintTextOpacity: hintTextOpacity ? 0 : 1,
          hintText: hintText[newHintTextIndex]
        })
      }else{
        this.setState({hintTextOpacity: hintTextOpacity ? 0 : 1})
      }
      this.animateHintText();
    })
  }

  endRound = () => {
    clearInterval(this.timer);
    this.props.navigation.navigate('InVote');
  };

  shouldComponentUpdate(nextProps) {
    const { gameData, gameDoc } = nextProps;

    if (gameData.roundSkipped) {
      gameDoc.ref.update('roundSkipped', false);
      this.endRound();
      return false;
    }

    return true;
  }

  render() {
    const { currentPlayer, gameDoc } = this.props;
    const { timer, hintText } = this.state;
    const hintTextOpacity = this.hintTextOpacity.interpolate({
      inputRange: [0,1],
      outputRange: [0,1]
    });

    return (
      <View style={styles.page}>

        <Text type="bold" style={{fontSize: 240}}>
          {timer}
        </Text>

        <Animated.View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: hintTextOpacity,
          width: '100%',
          padding: 20,
          height: 150
        }}>
          <Text color='#00EB0A' type='light' style={{textAlign: 'center'}}>{hintText}</Text>
        </Animated.View>

        {currentPlayer.isAdmin && (
          <View style={{ position: 'absolute', marginBottom: 10, bottom: 0 }}>
            <Button
              onPress={() => {
                gameDoc.ref.update('roundSkipped', true);
              }}>
              <Text>Skip to voting</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameData: state.game.gameData,
  gameDoc: state.game.gameDoc,
  currentPlayer: getCurrentPlayer(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenHOC(InRound));
