import {combineReducers} from 'redux';

import userReducer from './userReducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    user: userReducer,
    ...asyncReducers,
  });
}
