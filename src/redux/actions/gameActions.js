export const JOIN_GAME = 'JOIN_GAME';
export const START_GAME = 'START_GAME';
export const UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';
export const SET_GAME_DISCONNECT = 'SET_GAME_DISCONNECT';
export const UPDATE_PLAYERS_DATA = 'UPDATE_PLAYERS_DATA';
export const SET_PLAYERS_DISCONNECT = 'SET_PLAYERS_DISCONNECT';

export const joinGame = gameDoc => {
    return {
        type: JOIN_GAME,
        payload: gameDoc
    }
}

export const startGame = gameDoc => {
    return {
        type: START_GAME,
        payload: gameDoc
    }
}

export const updateGameData = data => {
    return {
        type: UPDATE_GAME_DATA,
        payload: data
    }
}

export const setGameDisconnect = gameDisconnect => {
    return {
        type: SET_GAME_DISCONNECT,
        payload: gameDisconnect
    }
}

export const updatePlayersData = data => {
    return {
        type: UPDATE_PLAYERS_DATA,
        payload: data
    }
}

export const setPlayersDisconnect = playersDisconnect => {
    return {
        type: SET_PLAYERS_DISCONNECT,
        payload: playersDisconnect
    }
}