export const generateSortedVotes = (players) => {
    const votingResults = players.reduce( (result, player ) => {
        if(!result[player.votingFor.displayName]){
            result[player.votingFor.displayName] = 0;
        }
        result[player.votingFor.displayName]++;
        return result;
    }, {});

    const sortedResults = [];
    for (let player in votingResults) {
        sortedResults.push([player, votingResults[player]]);
    }

    sortedResults.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortedResults;

}

export const getHighestVotedPlayer = (players) => {
    const votingResults = players.reduce( (result, player ) => {
        if(!result[player.votingFor.email]){
            result[player.votingFor.email] = 0;
        }
        result[player.votingFor.email]++;
        return result;
    }, {});

    const sortedResults = [];
    for (let player in votingResults) {
        sortedResults.push([player, votingResults[player]]);
    }

    sortedResults.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortedResults[0][0];

}
