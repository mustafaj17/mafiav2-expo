import PlaceHolderImage from "../../../../assets/placeholder-image.png";
import Text from "../../../components/text";
import React from "react";

export const slideData = [
  {
    image: PlaceHolderImage,
    text: <Text style={{paddingTop: 20}}>You need a <Text color='#FF0000'>minimum of 3 people</Text> to play this game and you must be <Text color='#FF0000'>together.</Text></Text>
  }, {
    image: PlaceHolderImage,
    text: <Text style={{paddingTop: 20}}>Once the game has started, mafia and civilian types will be assigned randomly to each player</Text>
  }, {
    image: PlaceHolderImage,
    text: <Text style={{paddingTop: 20}}>Mafias must work together to eliminate the civilians, whilst not revealing their true identity</Text>
  }, {
    image: PlaceHolderImage,
    text: <Text style={{paddingTop: 20}}>Civilians must try to identify the mafias and eliminate them.</Text>
  }, {
    text: <Text style={{paddingTop: 20}}>After each round, players will need to vote who they believe to be the mafia. The player with the most votes will be eliminated. This will continues until either team wins</Text>
  }
];
