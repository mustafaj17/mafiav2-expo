import React from 'react'
import { View } from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import {getCurrentPlayer} from "../../../redux/selectors";
import GameScreenHOC from "../../../components/gameScreenHoc";
import Text from '../../../components/text';
import Button from '../../../components/button';

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

    shouldComponentUpdate(nextProps){

        const { gameData, gameDoc } = nextProps;

        if(gameData.roundSkipped){
            gameDoc.ref.update('roundSkipped', false);
            this.endRound();
            return false;
        }

        return true;
    }

    render() {
        const { currentPlayer, gameDoc } = this.props;

        return (
           <View style={{...styles.page, justifyContent: 'space-between'}}>

               <View><Text type='bold'  style={{marginTop: 10}}>InRound</Text></View>
               <Text type='bold' size='large'>{this.state.timer} </Text>

               { currentPlayer.isAdmin &&
               <Button onPress={ () => {
                   gameDoc.ref.update( 'roundSkipped', true)
               }} >
                   <Text color='black'>Skip to voting</Text>
               </Button>

               }

           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameData: state.game.gameData,
    gameDoc: state.game.gameDoc,
    currentPlayer: getCurrentPlayer(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenHOC(InRound));
