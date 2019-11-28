import { CLEAR_MODAL_DATA, SET_MODAL_DATA } from '../actions/modalActions';

export default (state = null, action) => {

  switch (action.type){
    case SET_MODAL_DATA:
      return action.player
    case CLEAR_MODAL_DATA:
      return null;
    default:
      return state;
  }

}
