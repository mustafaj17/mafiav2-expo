export const SET_MODAL_DATA = 'SET_MODAL_DATA';
export const CLEAR_MODAL_DATA = 'CLEAR_MODAL_DATA';

export const setModalData = player => {
  return {
    type: SET_MODAL_DATA,
    player,
  };
};

export const clearModalData = () => {
  return {
    type: CLEAR_MODAL_DATA,
  };
};
