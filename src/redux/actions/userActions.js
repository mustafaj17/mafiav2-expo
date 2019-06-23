export const SET_USER = 'SET_USER';
export const SET_USER_IS_ADMIN = 'SET_USER_IS_ADMIN';

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const setUserIsAdmin = () => {
    return {
        type: SET_USER_IS_ADMIN
    }
}