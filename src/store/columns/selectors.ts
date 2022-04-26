import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectColumns = (state: RootState) => state.columns.columns;

export const findColumnsById = (id: number) => {
  return createSelector(selectColumns, (state) =>
    state.find(el => el.id === id)
  );
}

export const findColumnByColumnId = (id: number) => {
  return createSelector(selectColumns, (state) =>
    state.find(el => el.id === id)
  );
}
