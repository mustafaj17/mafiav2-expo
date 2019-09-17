import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../text';

class PlayerVoteResult extends React.Component {

  state = {
    showVoters : false
  }
  componentDidMount() {
    this.setState({
      showVoters : this.props.showVoters
    })
  }

  render() {

    const {playerName, votedForBy } = this.props;
    const {showVoters } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={ () => this.setState({showVoters : !showVoters})}>
          <Text>{playerName} got {votedForBy.length} votes</Text>
        </TouchableOpacity>
        {showVoters &&
        <View>
          {votedForBy.map(player => <Text>{player}</Text>)}
        </View>
        }
      </View>
    );
  }
}

export default PlayerVoteResult;
