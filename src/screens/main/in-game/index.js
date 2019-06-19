import React from 'react'
import { View, Text, BackHandler, ToastAndroid, } from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../redux/actions/gameActions';
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
        const { user } = this.props;
        const gameRef = this.props.gameDoc.ref;
        const playersColRef = gameRef.collection('players');
        playersColRef.doc(user.email).set({
            uid: user.uid,
            displayName: user.displayName
        });



        const disconnectFromPlayerCollection = playersColRef.onSnapshot(querySnapshot => {
            const players = [];

            querySnapshot.forEach( playerDocument => {
                players.push(playerDocument.data())
            })

            this.props.updatePlayersData(players);
        });

        this.props.setPlayersDisconnect(disconnectFromPlayerCollection);



        const disconnectFromGame = gameRef.onSnapshot(doc => {
            this.props.updateGameData(doc.data());
        });

        this.props.setGameDisconnect(disconnectFromGame);
    }


    render() {

        const { gameData, playersData } = this.props;

        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />

               <View><Text>{gameData.gameName}</Text></View>
               <View><Text>{playersData.length}</Text></View>

           </View>
        )
    }
}


const mapStateToProps = state => ({
    gameDoc: state.game.gameDoc,
    gameData: state.game.gameData,
    playersData: state.game.playersData,
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateGameData: data => dispatch(updateGameData(data)),
    updatePlayersData: data => dispatch(updatePlayersData(data)),
    setGameDisconnect: gameDisconnect => dispatch(setGameDisconnect(gameDisconnect)),
    setPlayersDisconnect: playersDisconnect => dispatch(setPlayersDisconnect(playersDisconnect))
})

export default connect(mapStateToProps, mapDispatchToProps)(InGame);