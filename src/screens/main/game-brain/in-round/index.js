import React from 'react'
import { View, Text, BackHandler, ToastAndroid, } from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';
import PlayersList from '../../../../components/playersList';
import ReadyButton from '../../../../components/playerReadyButton';

class InRound extends React.Component {
    static navigationOptions = {
        header: {
            visible: false,
        }
    }

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

    render() {
        const { gameData } = this.props
        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />

               <Text> InRound </Text>
               <Text>Insert Timer.... and navigate to inVote</Text>
           </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data,
    gameData: state.game.gameData,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InRound);