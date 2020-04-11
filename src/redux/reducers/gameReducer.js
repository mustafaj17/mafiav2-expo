import {
  SET_GAME_DOCUMENT,
  UPDATE_GAME_DATA,
  SET_GAME_DISCONNECT,
  UPDATE_PLAYERS_DATA,
  SET_PLAYERS_DISCONNECT,
  TOGGLE_DISPLAY_PLAYER_TYPES,
  END_GAME,
  USER_HAS_SEEN_TYPE, USER_CLICKED_TOGGLE_BTN,
} from './../actions/gameActions';
import { SET_GAME_CONFIG } from '../actions/gameActions';

const initialState = {
  gameDoc: null,
  gameData: {
    gameName: 'loading',
  },
  playersData: [],
  gameDisconnect: null,
  playersDisconnect: null,
  showPlayerTypes: false,
  userHasSeenType: false,
  userClickedToggleBtn: false,
  config: {
    timer: 30,
    mafiaCount: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_DOCUMENT:
      return {
        ...state,
        gameDoc: action.payload,
      };
    case UPDATE_GAME_DATA:
      return {
        ...state,
        gameData: action.payload,
      };
    case SET_GAME_DISCONNECT:
      return {
        ...state,
        gameDisconnect: action.payload,
      };
    case UPDATE_PLAYERS_DATA:
      return {
        ...state,
        playersData: action.payload,
      };
    case SET_PLAYERS_DISCONNECT:
      return {
        ...state,
        playersDisconnect: action.payload,
      };
    case TOGGLE_DISPLAY_PLAYER_TYPES:
      return {
        ...state,
        showPlayerTypes: !state.showPlayerTypes,
      };
    case END_GAME:
      return {
        ...initialState,
      };
    case USER_HAS_SEEN_TYPE:
      return {
        ...state,
        userHasSeenType: true,
      };
    case USER_CLICKED_TOGGLE_BTN:
      return {
        ...state,
        userClickedToggleBtn: true,
      };
    case SET_GAME_CONFIG:
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
