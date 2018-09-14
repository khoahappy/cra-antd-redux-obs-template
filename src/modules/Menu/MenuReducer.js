import { handleActions } from 'redux-actions';

export const MENU_ACTION_TYPE = {
  GET_MENU: 'MENU/GET',
  GET_MENU_SUCCESS: 'MENU/GET_MENU_SUCCESS',
  GET_MENU_ERROR: 'MENU/GET_MENU_ERROR',
};


const defaultState = {
  menu: [],
};

const reducer = handleActions(
  {
    [MENU_ACTION_TYPE.GET_MENU]: (state, action) => ({ ...state, menu: action.payload }),
  },
  defaultState,
);

export default reducer;
