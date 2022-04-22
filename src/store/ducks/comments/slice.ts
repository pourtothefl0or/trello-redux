import { createSlice } from "@reduxjs/toolkit";
import { CommentsState, IComment } from "./types";

const initialState: CommentsState = {
  comments: []
}

const cardsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state: any, action: any) {
      if (action.payload.comment) {
        state.comments.push({
          id: Date.now(),
          cardId: action.payload.cardId,
          userId: action.payload.userId,
          comment: action.payload.comment,
        });
      }
    },
    editComment(state: any, action: any) {
      const findItem = state.comments.find((el: IComment) => el.id === action.payload.id);

      findItem.comment = action.payload.comment;
    },
    deleteComment(state: any, action: any) {
      state.comments = state.comments.filter((el: IComment) => el.id !== action.payload.id);
    }
  }
});

export const { addComment, editComment, deleteComment } = cardsSlice.actions;

export default cardsSlice.reducer;
