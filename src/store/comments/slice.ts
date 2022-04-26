import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types';
import { IComment } from '../../types/interface';

const initialState: InitialState = {
  comments: []
}

const cardsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state: any, { payload }: PayloadAction<IComment>) {
      if (payload.comment) {
        state.comments.push({
          id: payload.id,
          cardId: payload.cardId,
          userId: payload.userId,
          comment: payload.comment,
        });
      }
    },
    editComment(state: any, { payload }: PayloadAction<Omit<IComment, 'cardId' | 'userId'>>) {
      const findItem = state.comments.find((el: IComment) => el.id === payload.id);

      findItem.comment = payload.comment;
    },
    deleteComment(state: any, { payload }: PayloadAction<{ id: number }>) {
      state.comments = state.comments.filter((el: IComment) => el.id !== payload.id);
    }
  }
});

export const actions = cardsSlice.actions;
export const reducers = cardsSlice.reducer;
