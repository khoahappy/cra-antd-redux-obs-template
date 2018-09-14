import { ofType } from 'redux-observable';
import {
  mergeMap, map, catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { MENU_ACTION_TYPE } from './MenuReducer';

import { saveMenu, getMenuError } from './MenuAction';

export const menuEpic = action$ => action$.pipe(
  ofType(MENU_ACTION_TYPE.GET_MENU),
  mergeMap(() => of([1, 2, 3]).pipe(
    map(response => saveMenu(response)),
    catchError(error => of(getMenuError(error.message))),
  )),
);
