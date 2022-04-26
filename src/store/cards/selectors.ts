import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCards = (state: RootState) => state.cards.cards;

export const filterCardsByColumnId = (columnId: number) => {
  return createSelector(selectCards, (state) =>
    state.filter(el => el.columnId === columnId)
  );
}

export const filterCardsById = (id: number) => {
  return createSelector(selectCards, (state) =>
    state.filter(el => el.id === id)
  );
}

export const findCardById = (id: number) => {
  return createSelector(selectCards, (state) =>
    state.find(el => el.id === id)
  );
}
