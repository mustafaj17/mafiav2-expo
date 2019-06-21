import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import styles from "../../styles/global";

class PlayersList extends Component {
    render(){
        const { players } = this.props;
        return(
          <View>
              <Text>Players</Text>
              {players.map( player => (
                 <View key={player.displayName} style={styles.button}>
                     <Text>{player.displayName}</Text>
                 </View>
              ))}
          </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.game.playersData
    }
}

export default connect(mapStateToProps)(PlayersList);