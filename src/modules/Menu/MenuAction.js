import { createActions } from 'redux-actions';
import { MENU_ACTION_TYPE } from './MenuReducer';

export const {
  getMenu,
  saveMenu,
  getMenuError,
} = createActions(
  MENU_ACTION_TYPE.GET_MENU,
  MENU_ACTION_TYPE.GET_MENU_SUCCESS,
  MENU_ACTION_TYPE.GET_MENU_ERROR,
);
