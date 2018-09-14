import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  reducer as toastrReducer,
} from 'react-redux-toastr';

import {
  menuReducer as menu,
  loginReducer as auth,
} from '../modules';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  router: routerReducer,
  menu,
  auth,
});

export default rootReducer;
