import React from 'react'
import {View, Text } from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import PlayersList from '../../../../components/playersList';
import ReadyButton from '../../../../components/playerReadyButton';
import {areAllPlayersReady} from "../../../../redux/selectors/index";

class PreRound extends React.Component {

    componentDidUpdate(){
        const { navigation, allPlayersAreReady } = this.props;

        if(allPlayersAreReady) {
            navigation.navigate('InRound');
        }
    }

    render() {

        const { gameData, currentPlayer  } = this.props;

        return (
           <View style={styles.page}>

               <View><Text>Pre-Round Screen</Text></View>

               <View><Text>{gameData.gameName}</Text></View>
               <PlayersList/>

               {!currentPlayer.isOut && !currentPlayer.ready &&
                <ReadyButton/>
               }

           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameData: state.game.gameData,
    currentPlayer: state.game.playersData.find( player => player.email === state.user.data.email),
    allPlayersAreReady: areAllPlayersReady(state)
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PreRound);
