import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import styles from "../../styles/global";
import {getInGamePlayers} from "../../redux/selectors";

class PlayersList extends Component {
    render(){
        const { inGamePlayers } = this.props;
        return(
          <View>
              <Text>Players</Text>
              {inGamePlayers.map( player => (
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
        inGamePlayers: getInGamePlayers(state)
    }
}

export default connect(mapStateToProps)(PlayersList);
