import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import playerReducer from './playerReducer';

export default combineReducers({
    game: gameReducer,
    user: userReducer,
    player: playerReducer,
})
