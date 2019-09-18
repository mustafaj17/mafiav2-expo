export const SET_USER = 'SET_USER';
export const UPDATE_USER_PROFILE_PIC = 'UPDATE_USER_PROFILE_PIC';
export const LOADING_USER_PHOTO_TOGGLE = 'LOADING_USER_PHOTO_TOGGLE';

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const updateUserProfilePic = photoURL => {
    return {
        type: UPDATE_USER_PROFILE_PIC,
        payload: photoURL
    }
}

export const loadingUserPhotoToggle = () => {
    return {
        type: LOADING_USER_PHOTO_TOGGLE,
    }
}
