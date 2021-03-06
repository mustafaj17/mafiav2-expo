export const SET_USER = 'SET_USER';
export const UPDATE_USER_PROFILE_PIC = 'UPDATE_USER_PROFILE_PIC';
export const SET_USER_STATS = 'SET_USER_STATS';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const updateUserProfilePic = photoURL => {
  return {
    type: UPDATE_USER_PROFILE_PIC,
    payload: photoURL,
  };
};

export const setUserStats = stats => {
  return {
    type: SET_USER_STATS,
    payload: stats,
  };
};
