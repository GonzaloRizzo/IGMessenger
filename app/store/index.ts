import {
  configureStore as configureRTKStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';

import createRootReducer from './reducers';
import igClient from './services/igApi';
import { setState } from './features/IgStateSlice';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);

export type State = ReturnType<typeof rootReducer>;

const store = configureRTKStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger, router] as const
});

igClient.request.end$.subscribe(async () => {
  const serialized = await igClient.state.serialize();
  delete serialized.constants; // this deletes the version info, so you'll always use the version provided by the library

  store.dispatch(setState(serialized));
});

export type Store = typeof store;

export { store, history };
