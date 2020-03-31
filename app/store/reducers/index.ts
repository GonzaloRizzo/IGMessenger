import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import igStateReducer from '../features/IgStateSlice';
import threadsReducer from '../features/threads/threadsSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    igState: igStateReducer,
    threads: threadsReducer
  });
}
