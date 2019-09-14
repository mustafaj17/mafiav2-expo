import { SET_USER, UPDATE_USER_PROFILE_PIC } from './../actions/userActions';

export default (state = {}, action) => {

    switch (action.type){
        case SET_USER:
            return action.payload
        case UPDATE_USER_PROFILE_PIC:
            return {
                ...state,
                photoURL: action.payload
            }
        default:
            return state;
    }

}
