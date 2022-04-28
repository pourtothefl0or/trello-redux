import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, IComment } from './types';

const initialState: InitialState = {
  comments: []
}

const cardsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, { payload }: PayloadAction<IComment>) {
      state.comments.push(payload);
    },
    editComment(state, { payload }: PayloadAction<Omit<IComment, 'cardId' | 'userId'>>) {
      const findItem = state.comments.find((el: IComment) => el.id === payload.id);

      if (findItem) {
        findItem.comment = payload.comment;
      }
    },
    deleteComment(state, { payload }: PayloadAction<{ id: number }>) {
      state.comments = state.comments.filter((el: IComment) => el.id !== payload.id);
    }
  }
});

export const actions = cardsSlice.actions;
export const reducers = cardsSlice.reducer;
