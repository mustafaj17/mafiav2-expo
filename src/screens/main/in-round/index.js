import React from 'react';
import { View } from 'react-native';
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { getCurrentPlayer } from '../../../redux/selectors';
import GameScreenHOC from '../../../components/gameScreenHoc';
import Text from '../../../components/text';
import Button from '../../../components/button';
import PageTitle from '../../../components/pageTitle';

class InRound extends React.Component {
  state = {
    timer: 59,
  };

  componentDidMount() {
    this.setTimer();
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

    return (
      <View
        style={{
          ...styles.page,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text type="bold" style={{ fontSize: 240, textAlign: 'center' }}>
          {this.state.timer}{' '}
        </Text>

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
