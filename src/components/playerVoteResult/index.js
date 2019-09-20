import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import Text from '../text';
import { FontAwesome } from '@expo/vector-icons'

class PlayerVoteResult extends React.Component {

  constructor(props){
    super(props);
    let maxHeight = props.votedForBy.length * 35;
    let initHeight = !!props.showVoters ? maxHeight : 0;

    this.state = {
      showVoters : !!props.showVoters,
      maxHeight: maxHeight
    }

    this.height = new Animated.Value(initHeight);
  }


  handleToggle = () => {
    const updatedShowVoter = !this.state.showVoters
    this.setState({showVoters : updatedShowVoter})
    Animated.timing(this.height, {
      toValue: updatedShowVoter ? this.state.maxHeight : 0,
      duration: 150
    }).start();
  }

  render() {

    const {playerName, votedForBy } = this.props;
    const {showVoters } = this.state;

    return (
      <TouchableOpacity onPress={ this.handleToggle }>
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

          <Animated.View style={{height: this.height}}>
            {votedForBy.map(player => <Text key={player} type='light' style={{marginTop: 5}}>{player}</Text>)}
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PlayerVoteResult;
