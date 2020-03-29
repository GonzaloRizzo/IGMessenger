import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import igStateReducer from '../features/IgStateSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    igState: igStateReducer
  });
}
