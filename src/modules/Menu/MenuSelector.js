import { createSelector } from 'reselect';

export const menuSelector = state => state.menu;

export const menuItems = createSelector(menuSelector,
  menuState => menuState.items);
