import { combineEpics } from 'redux-observable';
// import { createRequiresTokenEpic, refreshTokenEpic } from './common/commonEpic';
import { menuEpic } from '../modules';
// Import feature wise epic

// const rootEpic = createRequiresTokenEpic(
//   menuEpic,
//   refreshTokenEpic,
// );

const rootEpic = combineEpics(
  menuEpic,
);

export default rootEpic;
