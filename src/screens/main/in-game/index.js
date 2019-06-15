import React from 'react'
import { View, Text, BackHandler, ToastAndroid, } from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect } from '../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';

class InGame extends React.Component {
    static navigationOptions = { header: null }

    screenWillFocus= () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    screenWillBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount() {

        // const gameRef = this.props.gameDoc.ref;
        // const playersColRef = gameRef.collection('players');
        // const playerDocRef = playersColRef()

        //connect to the player collection and update when it changes
        // this.disconnectFromPlayers = playersColRef.onSnapshot(playersSnapshot => {
        //     let playersArray = [];
        //     playersSnapshot.forEach(playerDoc => {
        //         playersArray.push(playerDoc.data())
        //     })
        //
        //     this.setState({
        //         players: playersArray
        //     })
        //
        //     this.runGame();
        // })

        // playersColRef.add({
        //     type: null,
        //     inGame: true,
        //     ready: false,
        //     ...this.user
        // })
        //    .then(playerDocRef => {
        //        playerDocRef.get().then(playerDoc => {
        //
        //            this.setState({
        //                playerRef: playerDocRef
        //            });
        //
        //            this.disconnectFromPlayer = playerDoc.ref.onSnapshot(playerRef => {
        //                this.setState({
        //                    playerRef: playerRef
        //                })
        //            })
        //        })
        //
        //    })


        const disconnectFromGame = this.props.gameDoc.ref.onSnapshot(doc => {
            this.props.updateGameData(doc.data());
        });
        this.props.setGameDisconnect(disconnectFromGame);
    }


    render() {

        const { gameData } = this.props;

        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />

               <View><Text>{gameData.gameName}</Text></View>

           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameDoc: state.game.gameDoc,
    gameData: state.game.gameData
})

const mapDispatchToProps = dispatch => ({
    updateGameData: data => dispatch(updateGameData(data)),
    setGameDisconnect: gameDisconnect => dispatch(setGameDisconnect(gameDisconnect))
})

export default connect(mapStateToProps, mapDispatchToProps)(InGame);