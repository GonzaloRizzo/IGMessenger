import { configureStore as configureRTKStore } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);

export type State = ReturnType<typeof rootReducer>;

const store = configureRTKStore({
  reducer: rootReducer,
  middleware: [router]
});

export type Store = typeof store;

export { store, history };
