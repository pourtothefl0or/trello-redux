import { combineReducers } from '@reduxjs/toolkit';
import * as user from './user';
import * as columns from './columns';
import * as cards from './cards';
import * as comments from './comments';

export const reducers = combineReducers({
  user: user.reducers,
  columns: columns.reducers,
  cards: cards.reducers,
  comments: comments.reducers,
});

export const selectors = {
  user: user.selectors,
  columns: columns.selectors,
  cards: cards.selectors,
  comments: comments.selectors,
};

export const actions = {
  user: user.actions,
  columns: columns.actions,
  cards: cards.actions,
  comments: comments.actions,
};

