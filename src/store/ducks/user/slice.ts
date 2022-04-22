import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import { IUser } from '../../../types/interface';

const initialState: UserState | any = {
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state: any, action: any) {
      if (action.payload.name) {
        state.user = {
          id: 1,
          name: action.payload.name
        };
      }
    },
  }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
