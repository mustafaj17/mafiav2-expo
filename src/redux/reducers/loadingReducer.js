import {CONNECTED_TO_GAME_DOC, CONNECTED_TO_PLAYER_COLLECTION} from "../actions/loadingActions";

const initialState = {
    connectedToGameDoc: false,
    connectedToPlayersCollection: false

}

export default (state = false, action) => {
    switch (action.type){
        case CONNECTED_TO_GAME_DOC:
            return {
                ...state,
                connectedToGameDoc: true
            }
        case CONNECTED_TO_PLAYER_COLLECTION:
            return {
                ...state,
                connectedToPlayersCollection: true
            }
        default:
            return state;
    }
}
