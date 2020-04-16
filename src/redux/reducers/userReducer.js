import {
  SET_USER,
  UPDATE_USER_PROFILE_PIC,
} from './../actions/userActions';
import { SET_USER_STATS } from '../actions/userActions';

export default (
  state = {
    stats: null,
  },
  action,
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER_PROFILE_PIC:
      return {
        ...state,
        photoURL: action.payload,
      };
    case SET_USER_STATS:
      return {
        ...state,
        stats: {
          ...action.payload
        },
      };
    default:
      return state;
  }
};
