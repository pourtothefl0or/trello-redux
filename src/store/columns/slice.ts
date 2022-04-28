import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, IColumn } from './types';

const initialState: InitialState = {
  columns: [
    { id: 1, column: 'To Do' },
    { id: 2, column: 'In progress' },
    { id: 3, column: 'Testing' },
    { id: 4, column: 'Done' },
  ]
}

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    editColumn(state, { payload }: PayloadAction<IColumn>) {
        const findItem = state.columns.find((el: IColumn) => el.id === payload.id);

        if (findItem) {
          findItem.column = payload.column;
        }
    },
  }
});

export const actions = columnsSlice.actions;
export const reducers = columnsSlice.reducer;
