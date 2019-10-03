import React from 'react'
import {connect} from "react-redux";
import Text from '../text';
import { getCurrentPlayer } from '../../redux/selectors';
import { TouchableOpacity, View, Animated } from 'react-native';

class playerReadyButton extends React.Component{

    constructor(props){
        super(props);
        this.readyBtnScale = new Animated.Value(1);
        this.readyBtnBorder = new Animated.Value(1);
        this.runAnimation();
    }

    setPlayerReady = () => {

        const { gameDoc, currentPlayer } = this.props;

        if (currentPlayer.ready) return;

        gameDoc.ref.collection('players').doc(currentPlayer.email).update({
            ready: true
        })
    }

    componentDidUpdate = () => {
        this.runAnimation();
    }

    runAnimation = () => {
        if (!this.props.currentPlayer.ready) {
            Animated.loop(
              Animated.sequence([
                  Animated.timing(this.readyBtnScale, {
                      toValue: 1,
                      duration: 200,
                  }),
                  Animated.timing(this.readyBtnScale, {
                      toValue: 0,
                      duration: 200,
                  }),
                  Animated.timing(this.readyBtnScale, {
                      toValue: 1,
                      duration: 200,
                  })
              ])).start();
        }else{
            this.readyBtnScale.stopAnimation();
            Animated.timing(this.readyBtnBorder, {
                toValue: 0,
                duration: 200,
            }).start();
        }
    }

    render() {

        const { currentPlayer } = this.props;

        let boxScale = this.readyBtnScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05]
        })

        let boxRadius = this.readyBtnBorder.interpolate({
            inputRange: [0, 1],
            outputRange: [5, 40]
        })
        let height = this.readyBtnBorder.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 80]
        })
        let width = this.readyBtnBorder.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 80]
        })


        return (

          <View >
              <TouchableOpacity style={{ display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  width: '100%',
                  flex: 1,
                  bottom: 10,
                  left: 0,}} onPress={this.setPlayerReady}>
                  <Animated.View style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#00FFC2',
                      height: height,
                      width: width,
                      borderRadius: boxRadius,
                      shadowOffset: { width: 2, height: 4 },
                      shadowRadius: 2,
                      shadowColor: 'rgba(34, 23, 83, 0.27)',
                      shadowOpacity: 1,
                      transform: [
                          { scale: boxScale }
                      ],
                      elevation: 5
                  }}>
                      <Text color='black'> {currentPlayer.ready ? 'Waiting...' : 'Ready'}</Text>
                  </Animated.View>
              </TouchableOpacity>
          </View>
        )
    }
}

const mapStateToProps = state => ({
    gameName: state.game.gameData.gameName,
    gameDoc: state.game.gameDoc,
    currentPlayer: getCurrentPlayer(state)
})

export default connect(mapStateToProps)(playerReadyButton)
