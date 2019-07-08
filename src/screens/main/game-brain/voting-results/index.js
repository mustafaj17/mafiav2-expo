import React from 'react'
import { View, Text} from 'react-native'
import styles from '../../../../styles/global';
import { connect } from 'react-redux';

class VotingResults extends React.Component {

    render() {

        const { players } = this.props;
        const votingResults = players.reduce( (result, player ) => {
            if(!result[player.votingFor]){
                result[player.votingFor] = 0;
            }
            result[player.votingFor]++;
            return result;
        }, {});

        const sortedResults = [];
        for (let player in votingResults) {
            sortedResults.push([player, votingResults[player]]);
        }

        sortedResults.sort(function(a, b) {
            return b[1] - a[1];
        });

        console.log('sortedresults***', sortedResults)

        return (
           <View style={styles.page}>

               <View>
                   {sortedResults.map( result => <View>
                       <Text>
                           {result[0]} : {result[1]}
                       </Text>
                   </View>)}
               </View>

               <Text> VotingResults </Text>
           </View>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user.data,
    players: state.game.playersData,
    game: state.game.gameData
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VotingResults);