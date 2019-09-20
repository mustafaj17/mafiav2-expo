import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../text';
import { FontAwesome } from '@expo/vector-icons'

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
      <TouchableOpacity onPress={ () => this.setState({showVoters : !showVoters})}>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'white', padding: 10}}>

          <View style={{ display: 'flex', flexDirection: 'row'}}>
            <Text type='bold'>{playerName}</Text><Text> got {votedForBy.length} votes</Text>
            <View style={{ marginLeft: 'auto'}}>
              {showVoters ?
                <FontAwesome name='caret-up' size={24} color='white'/> :
                <FontAwesome name='caret-down' size={24} color='white'/>
              }
            </View>
          </View>

          {showVoters &&
          <View>
            {votedForBy.map(player => <Text type='light' style={{marginTop: 5}}>{player}</Text>)}
          </View>
          }
        </View>
      </TouchableOpacity>
    );
  }
}

export default PlayerVoteResult;
