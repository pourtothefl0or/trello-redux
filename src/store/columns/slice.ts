import { createSlice } from '@reduxjs/toolkit';
import { ColumnsState } from './types';

const initialState: ColumnsState = {
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
    editColumn(state: any, action: any) {
      if (action.payload.column) {
        const findItem = state.columns.find((el: any) => el.id === action.payload.id);

        findItem.column = action.payload.column;
      }
    },
  }
});

export const actions = columnsSlice.actions;
export const reducers = columnsSlice.reducer;
