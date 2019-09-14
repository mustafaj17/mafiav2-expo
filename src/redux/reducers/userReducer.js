import { SET_USER, SET_USER_IS_ADMIN, UPDATE_USER_PROFILE_PIC } from './../actions/userActions';

const initialState = {
    data: null,
    isAdmin: false
}

export default (state = initialState, action) => {

    switch (action.type){
        case SET_USER:
            return {
                data: action.payload
            }
        case SET_USER_IS_ADMIN:
            return {
                ...state,
                isAdmin: true
            }
        case UPDATE_USER_PROFILE_PIC:
            return {
                ...state,
                data: {
                    ...state.data,
                    photoURL: action.payload
                }
            }
        default:
            return state;
    }

}
