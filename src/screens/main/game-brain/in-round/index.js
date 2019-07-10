import React from 'react'
import {View, Text, Button,} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import {getCurrentPlayer} from "../../../../redux/selectors/index";

class InRound extends React.Component {

    state = {
        timer: 10
    }

    componentDidMount(){
        this.setTimer();
    }

    setTimer = () => {
        this.timer = setInterval( ()=> {
            const newTime = this.state.timer-1;
            if(newTime === 0){
                this.endRound();
            }else{
                this.setState({ timer: newTime})
            }
        }, 1000);
    };

    endRound = () => {
        clearInterval(this.timer);
        this.props.navigation.navigate('InVote');
    }

    componentDidUpdate(){

        const { gameData, gameDoc } = this.props;

        if(gameData.roundSkipped){
            //reset the flag for next round
            gameDoc.ref.update( 'roundSkipped', false);
            this.endRound();
            return null;
        }
    }

    render() {
        const { currentPlayer, gameDoc } = this.props;

        return (
           <View style={styles.page}>

               <Text> InRound </Text>
               <Text> {this.state.timer} </Text>

               { currentPlayer.isAdmin &&
               <Button title="Skip round" onPress={ () => {
                   gameDoc.ref.update( 'roundSkipped', true)
               }} />

               }

           </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data,
    gameData: state.game.gameData,
    gameDoc: state.game.gameDoc,
    currentPlayer: getCurrentPlayer(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InRound);