import React from 'react'
import { View, Text, BackHandler, ToastAndroid, } from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';
import { updateGameData, setGameDisconnect, updatePlayersData, setPlayersDisconnect } from '../../../../redux/actions/gameActions';
import { NavigationEvents } from 'react-navigation';
import PlayersList from '../../../../components/playersList';
import ReadyButton from '../../../../components/playerReadyButton';

class VotingResults extends React.Component {
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

    render() {

        return (
           <View style={styles.page}>

               <NavigationEvents
                  onWillFocus={this.screenWillFocus}
                  onWillBlur={this.screenWillBlur}
               />

               <Text> VotingResults </Text>
           </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VotingResults);