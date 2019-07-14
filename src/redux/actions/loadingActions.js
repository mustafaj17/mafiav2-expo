export const CONNECTED_TO_GAME_DOC = 'CONNECTED_TO_GAME_DOC';
export const CONNECTED_TO_PLAYER_COLLECTION = 'CONNECTED_TO_PLAYER_COLLECTION';

export const connectedToGameDoc = () => {
    return {
        type: CONNECTED_TO_GAME_DOC
    }
}

export const connectedToPlayerCollection = () => {
    return {
        type: CONNECTED_TO_PLAYER_COLLECTION
    }
}
