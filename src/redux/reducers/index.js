import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    game: gameReducer,
    user: userReducer,
    modal: modalReducer,
})
