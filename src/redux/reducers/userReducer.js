import { SET_USER, SET_USER_IS_ADMIN } from './../actions/userActions';

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
        default:
            return state;
    }

}