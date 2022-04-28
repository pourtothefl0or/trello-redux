import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, IUser } from './types';

const initialState: InitialState = {
  user: {} as IUser
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
    },
  }
});

export const actions = userSlice.actions;
export const reducers = userSlice.reducer;
