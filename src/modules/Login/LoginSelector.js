import { createSelector } from 'reselect';

export const loginSelector = state => state.auth;

export const isFetching = createSelector(
  loginSelector,
  loginState => loginState.isFetching,
);

export const isAuthenticated = createSelector(
  loginSelector,
  loginState => loginState.isAuthenticated,
);
