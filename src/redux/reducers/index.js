import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    game: gameReducer,
    user: userReducer,
    loading: loadingReducer
})
