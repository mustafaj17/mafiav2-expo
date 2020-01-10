import { TYPE } from '../../../constants';
export const generateSortedVotes = players => {
  const votingResults = players.reduce((result, player) => {
    if (!result[player.votingFor.displayName]) {
      result[player.votingFor.displayName] = [];
    }
    result[player.votingFor.displayName].push(player.displayName);
    return result;
  }, {});

  const sortedResults = [];
  for (let player in votingResults) {
    sortedResults.push([player, votingResults[player]]);
  }

  sortedResults.sort((a, b) => b[1].length - a[1].length);

  return sortedResults;
};
export const getPlayersWhoVotedFor = (currentPlayer, inGamePlayers) => {
  const voters = inGamePlayers.reduce((result, player) => {
    if (player.votingFor.email === currentPlayer.email) {
      result.push(player);
    }
    return result;
  }, []);

  return voters;
};

export const getHighestVotedPlayer = players => {
  const votingResults = players.reduce((result, player) => {
    if (!result[player.votingFor.email]) {
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
};

export const isGameOver = players => {
  let civilianCount = players.filter(player => player.type === TYPE.CIVILIAN);
  let mafiaCount = players.filter(player => player.type === TYPE.MAFIA);

  if (mafiaCount.length === 0) {
    //mafias win
    return true;
  }

  if (mafiaCount.length >= civilianCount.length) {
    // civilians win
    return true;
  }

  return false;
};
