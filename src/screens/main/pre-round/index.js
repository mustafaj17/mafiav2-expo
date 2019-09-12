import React from 'react'
import {View, Text, Button } from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import PlayersList from '../../../components/playersList';
import ReadyButton from '../../../components/playerReadyButton';
import {areAllPlayersReady, getCurrentPlayer, getInGamePlayers} from "../../../redux/selectors";
import {firestore} from "../../../services/firebase";
import { toggleDisplayPlayerTypes } from '../../../redux/actions/gameActions';
import DisabledBack from "../../../components/disableBack";

class PreRound extends React.Component {

    shouldComponentUpdate(nextProps){
        const { navigation, allPlayersAreReady } = nextProps;

        if(allPlayersAreReady) {
            navigation.navigate('InRound');
            return false;
        }

        return true;
    }

    render() {

        const { gameData, currentPlayer, inGamePlayers, gameDoc, toggleDisplayPlayerTypes } = this.props;

        return (
            <View style={styles.page}>

                <View><Text>Pre-Round Screen</Text></View>

                <View><Text>{gameData.gameName}</Text></View>
                <PlayersList/>

                {!currentPlayer.isOut && !currentPlayer.ready &&
                <ReadyButton/>
                }

                <Button title='ready-all' onPress={ () => {
                    const batch = firestore.batch();
                    inGamePlayers.forEach(player => {
                        batch.update(gameDoc.ref.collection('players').doc(player.email), {ready: true});
                    });
                    batch.commit().then( () => {});
                }}/>

                <Button title='toggle type' onPress={toggleDisplayPlayerTypes} />

            </View>
        )
    }
}


const mapStateToProps = state => ({
    gameData: state.game.gameData,
    gameDoc: state.game.gameDoc,
    inGamePlayers: getInGamePlayers(state),
    currentPlayer: getCurrentPlayer(state),
    allPlayersAreReady: areAllPlayersReady(state)
})

const mapDispatchToProps = dispatch => ({
    toggleDisplayPlayerTypes: () => dispatch(toggleDisplayPlayerTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(DisabledBack(PreRound));
