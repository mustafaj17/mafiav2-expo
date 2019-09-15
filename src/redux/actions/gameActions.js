export const SET_GAME_DOCUMENT = 'SET_GAME_DOCUMENT';
export const UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';
export const SET_GAME_DISCONNECT = 'SET_GAME_DISCONNECT';
export const UPDATE_PLAYERS_DATA = 'UPDATE_PLAYERS_DATA';
export const SET_PLAYERS_DISCONNECT = 'SET_PLAYERS_DISCONNECT';
export const TOGGLE_DISPLAY_PLAYER_TYPES = 'TOGGLE_DISPLAY_PLAYER_TYPES';

export const setGameDocument = gameDoc => {
    return {
        type: SET_GAME_DOCUMENT,
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

export const toggleDisplayPlayerTypes = () => {
    return {
        type: TOGGLE_DISPLAY_PLAYER_TYPES
    }
}
