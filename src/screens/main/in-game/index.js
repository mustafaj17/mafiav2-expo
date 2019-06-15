import React from 'react'
import { View, Text, BackHandler, ToastAndroid, } from 'react-native'
import styles from '../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect } from '../../../redux/actions/gameActions';

class InGame extends React.Component {
    static navigationOptions = { header: null }

    componentDidMount() {
        const disconnectFromGame = this.props.gameDoc.ref.onSnapshot(doc => {
            this.props.updateGameData(doc.data());
        });
        this.props.setGameDisconnect(disconnectFromGame);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }


    render() {

        const { gameData } = this.props;

        return (
           <View style={styles.page}>
               <Text>{gameData.gameName}</Text>
               <Text>{gameData.gameName}</Text>
               <Text>{gameData.gameName}</Text>
               <Text>{gameData.gameName}</Text>
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