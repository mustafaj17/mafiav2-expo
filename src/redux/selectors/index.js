export const getCurrentPlayer = state => {
    return state.game.playersData.find( player => player.email === state.user.data.email);
}

export const getInGamePlayers = state => {
    return state.game.playersData.filter( player => !player.isOut);
}

export const haveAllPlayersVoted = state => {
    return state.game.playersData.filter( player => !player.isOut).reduce( (allVoted ,player) => (allVoted && !!player.votingFor), true);
}
export const areAllPlayersReady = state => {
    return getInGamePlayers(state).reduce( (allReady,player) => (allReady && !!player.ready), true)
}