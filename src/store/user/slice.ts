import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/interface';
import { InitialState } from './types';

const initialState: InitialState | any = {
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state: any, { payload }: PayloadAction<IUser>) {
      if (payload.name) {
        state.user = {
          id: payload.id,
          name: payload.name
        };
      }
    },
  }
});

export const actions = userSlice.actions;
export const reducers = userSlice.reducer;
