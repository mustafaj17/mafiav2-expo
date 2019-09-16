import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView } from 'react-native'
import { getInGamePlayers } from '../../redux/selectors';
import Player from '../player';

class PlayersList extends Component {

  render(){

    const { inGamePlayers } = this.props;
    return(
      <ScrollView>
        {inGamePlayers.map( player => <Player key={player.uid} player={player} />)}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    inGamePlayers: getInGamePlayers(state)
  }
}

export default connect(mapStateToProps)(PlayersList);
