import React from "react";
import { TouchableHighlight, View } from "react-native";
import Text from "../text";

const EndGameTabs = ({ onChangePage, currentPage, tabs}) => {

  const getTabs = () => {

    return tabs.map(tab => (
      <TouchableHighlight
        underlayColor={'white'}
        activeOpacity={0.5}
        onPress={() => onChangePage(tab.name)}
        style={{width: `${100 / tabs.length}%`, opacity: currentPage === tab.name ? 1 : 0.5, alignItems: 'center'}}
      >
        <Text>{tab.title}</Text>
      </TouchableHighlight>
    ))
  };

  return (
    <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
      {getTabs()}
    </View>
  )};

export default EndGameTabs