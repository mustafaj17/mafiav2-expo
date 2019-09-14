export const SET_USER = 'SET_USER';
export const SET_USER_IS_ADMIN = 'SET_USER_IS_ADMIN';
export const UPDATE_USER_PROFILE_PIC = 'UPDATE_USER_PROFILE_PIC';

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

export const updateUserProfilePic = photoURL => {
    return {
        type: UPDATE_USER_PROFILE_PIC,
        payload: photoURL
    }
}
