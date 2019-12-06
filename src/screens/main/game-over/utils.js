export const sortGameStats = players => {
  let voters = {};
  players.forEach(player => {
    player.votedFor.forEach(vote => {
      if (!voters[vote]) voters[vote] = 0;
      voters[vote] ++
    })
  });

  let sortedResults = []

  for (let player in voters) {
    const playerObj = players.find(play => play.displayName === player)
    sortedResults.push([playerObj, voters[player]]);
  }
  sortedResults.sort((a, b) => b[1] - a[1]);

  return sortedResults
}

export const getVotesAgainstPlayer = (players, currentPlayer) => {
  let voters = {};
  players.forEach(player => {
    player.votedFor.forEach(vote => {
      if (vote === currentPlayer.displayName) {
        if (!voters[player.displayName]) voters[player.displayName] = 0;
        voters[player.displayName] ++
      }
    })
  });

  let sortedResults = sortObjectToArray(voters);
  return sortedResults.map(vote => {
    if (vote[1] === sortedResults[0][1]) {
      return [players.find(play => play.displayName === vote[0]), vote[1]]
    }
  })
}

export const generateStatsObj = (players, sortedResults) => {
  if (sortedResults[0][1] === sortedResults[sortedResults.length - 1][1]) return null;

  let zeroVotes = [];
  let stats = { mostVoted: [], leastVoted: [] };

  players.forEach(player => {
    if(!sortedResults.map(res => res[0].displayName).includes(player.displayName)) zeroVotes.push([player, 0])
  });

  sortedResults.forEach(result => {
    if(result[1] === sortedResults[0][1]) stats.mostVoted.push(result)
  });
  if(!zeroVotes.length) {
    sortedResults.forEach(result => {
      if (result[1] === sortedResults[sortedResults.length - 1][1]) stats.leastVoted.push(result)
    })
  } else {
    stats.leastVoted = zeroVotes;
  }

  return stats
}

const sortObjectToArray = obj => {
  let sortedResults = [];

  for (let item in obj) {
    sortedResults.push([item, obj[item]]);
  }
  sortedResults.sort((a, b) => b[1] - a[1]);

  return sortedResults
}
