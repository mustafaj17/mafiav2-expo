import { SET_USER, UPDATE_USER_PROFILE_PIC, LOADING_USER_PHOTO_TOGGLE } from './../actions/userActions';

export default (state = {}, action) => {

    switch (action.type){
        case SET_USER:
            return action.payload
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
        default:
            return state;
    }

}
