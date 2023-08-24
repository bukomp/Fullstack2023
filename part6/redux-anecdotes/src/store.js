import { configureStore } from '@reduxjs/toolkit';

import anecdotesService from './services/anecdotes';

import anecdoteReducer, {
  initializeAnecdotes,
} from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = {
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer,
};

const store = configureStore({ reducer });

anecdotesService
  .getAll()
  .then((anecdotes) => store.dispatch(initializeAnecdotes(anecdotes)));

export default store;
