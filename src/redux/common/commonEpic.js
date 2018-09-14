import { ofType, combineEpics } from 'redux-observable';
import {
  Observable, Subject, of,
} from 'rxjs';
import {
  mergeMap, exhaustMap, merge,
} from 'rxjs/operators';

import { authService } from '../../providers';
import * as utils from '../../utils/auth-helper';

export const REFRESH_TOKEN_SUCCESS = 'AUTH/REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'AUTH/REFRESH_TOKEN_FAILED';
export const REFRESH_TOKEN = 'AUTH/REFRESH_TOKEN';

export const refreshTokenEpic = action$ => action$.pipe(
  ofType(REFRESH_TOKEN),
  // If there's already a pending refreshToken() we'll ignore the new
  // request to do it again since its redundant. If you instead want to
  // cancel the pending one and start again, use switchMap()
  exhaustMap(() => Observable.from(authService.refreshToken())
    .map(response => ({
      type: REFRESH_TOKEN_SUCCESS,
      payload: response,
    }))
  // probably should force user to re-login or whatevs
    .catch(error => Observable.of({
      type: REFRESH_TOKEN_FAILED,
      payload: error,
    }))),
);

// factory to create a "super-epic" which will only
// pass along requiresAuth actions when we have a
// valid token, refreshing it if needed before.
export const createRequiresTokenEpic = (...epics) => (
  action$,
  store,
  ...rest
) => {
  // The epics we're delegating for
  const delegatorEpic = combineEpics(...epics);
  // We need some way to emit REFRESH_TOKEN actions
  // so I just hacked it with a Subject. There is
  // prolly a more elegant way to do this but #YOLO
  const output$ = new Subject();

  // This becomes action$ for all the epics we're delegating
  // for. This will hold off on giving an action to those
  // epics until we have a valid token. But remember,
  // this doesn't delay your *reducers* from seeing it
  // as its already been through them!
  const filteredAction$ = action$.pipe(
    mergeMap((action) => {
      if (action.requireLogin) {
      // No need to get from store
      // const needsRefresh = utils.hasTokenExpired((store.getState().token));
        const needsRefresh = utils.isTokenExpired(utils.getToken());
        if (needsRefresh) {
        // Kick off the refreshing of the token
          output$.next({ type: REFRESH_TOKEN });

          // Wait for a successful refresh
          return action$
            .pipe(ofType(REFRESH_TOKEN_SUCCESS))
            .take(1)
            .mapTo(action)
            .takeUntil(action$.pipe(ofType(REFRESH_TOKEN_FAILED)));
        // Its wise to handle the case when refreshing fails.
        // This example just gives up and never sends the
        // original action through because presumably
        // this is a fatal app state and should be handled
        // in refreshTokenEpic (.e.g. force relogin)
        }
      }

      // Actions which don't require auth are passed through as-is
      return of(action);
    }),
    merge(delegatorEpic(filteredAction$, store, ...rest), output$),
  );
};

export default {
  createRequiresTokenEpic,
  refreshTokenEpic,
};
