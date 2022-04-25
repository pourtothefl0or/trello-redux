import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectComments = (state: RootState) => state.comments.comments;

export const filterCommentsByCardId = (cardId: number) => {
  return createSelector(selectComments, (state) =>
    state.filter(el => el.cardId === cardId)
  );
}
