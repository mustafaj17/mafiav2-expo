import React from 'react'
import {Modal, ScrollView, View} from "react-native";
import Text from "../text";
import StatBox from "../statBox";
import Button from "../button";

export default class StatsModal extends React.Component {
  render() {
    const { stats, visible, toggleModal, getVotesAgainst } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: '80%', height: '80%', padding: 20, borderRadius: 4 }} >
            <View style={{margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text type='bold'>Stats</Text>
            </View>
            <ScrollView
              style={{ padding: 10, width: '100%'}}
              showsHorizontalScrollIndicator={false}
            >
              {stats.mostVoted.map(arr => <StatBox title='Most voted' name={arr[0]} number={arr[1]} />)}
              {stats.leastVoted.map(arr => <StatBox title='Least voted' name={arr[0]} number={arr[1]} />)}
              {getVotesAgainst()}
            </ScrollView>
            <Button onPress={toggleModal} style={{width: 150}}>
              <Text >Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
    )
  }
}
