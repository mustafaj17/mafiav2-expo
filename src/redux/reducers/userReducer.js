import { SET_USER, UPDATE_USER_PROFILE_PIC, LOADING_USER_PHOTO_TOGGLE } from './../actions/userActions';
import { SET_USER_STATS } from '../actions/userActions';

export default (state = {
    stats: null
}, action) => {

    switch (action.type){
        case SET_USER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER_PROFILE_PIC:
            return {
                ...state,
                photoURL: action.payload
            }
        case LOADING_USER_PHOTO_TOGGLE:
            return {
                ...state,
                loadingPhoto: !state.loadingPhoto
            }
        case SET_USER_STATS:
            return {
                ...state,
                stats: action.payload
            }
        default:
            return state;
    }

}
