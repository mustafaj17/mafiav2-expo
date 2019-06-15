import { START_GAME, JOIN_GAME, UPDATE_GAME_DATA, SET_GAME_DISCONNECT } from './../actions/gameActions';

const initialState = {
    gameDoc: null,
    gameData: {
        gameName: 'loading'
    },
    disconnect: null
}

export default (state = initialState, action) => {

    switch (action.type){
        case START_GAME:
            return {
               ...state,
                gameDoc: action.payload
            }
        case JOIN_GAME:
            return {
                ...state,
                gameDoc: action.payload
            }
        case UPDATE_GAME_DATA:
            return {
                ...state,
                gameData: action.payload
            }
        case SET_GAME_DISCONNECT:
            return {
                ...state,
                disconnect: action.payload
            }
        default:
            return state;
    }

}