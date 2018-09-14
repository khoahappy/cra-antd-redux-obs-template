/* eslint no-underscore-dangle: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
// import queryString from 'query-string';

// import root epic/reducer
import rootEpic from './rootEpic';
import reducer from './rootReducer';


// Below is a necessary hack to access __PRELOADED_STATE__ on the global window object
// console.log(epics);

// Below is a necessary hack to access __PRELOADED_STATE__ on the global window object
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const configureStore = (history) => {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware)),
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export default configureStore;