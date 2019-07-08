import { START_GAME, JOIN_GAME, UPDATE_GAME_DATA, SET_GAME_DISCONNECT,UPDATE_PLAYERS_DATA,SET_PLAYERS_DISCONNECT, START_NEXT_ROUND } from './../actions/gameActions';

const initialState = {
    gameDoc: null,
    gameData: {
        gameName: 'loading'
    },
    playersData: [],
    gameDisconnect: null,
    playersDisconnect: null,
    round: 0
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
                gameDisconnect: action.payload
            }
        case UPDATE_PLAYERS_DATA:
            return {
                ...state,
                playersData: action.payload
            }
        case SET_PLAYERS_DISCONNECT:
            return {
                ...state,
                playersDisconnect: action.payload
            }
        case START_NEXT_ROUND:
            return {
                ...state,
                round : state.round+1
            }
        default:
            return state;
    }

}