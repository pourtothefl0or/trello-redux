import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState: UserState = {
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state: any, action: any) {
      state.user = {
        id: 1,
        name: action.payload.name
      };
    },
  }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
