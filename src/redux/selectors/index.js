import {TYPE} from "../../constants";

export const getCurrentPlayer = state => {
    return state.game.playersData.find( player => player.email === state.user.email);
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

export const didMafiasWin = state => {
    let players = getInGamePlayers(state);
    let mafiaCount = players.filter(player => player.type === TYPE.MAFIA);

    if (mafiaCount.length === 0) {
        return false
    }

    return true;
}
