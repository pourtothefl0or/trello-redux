import { createSlice } from "@reduxjs/toolkit";
import { CardsState, ICard } from "./types";

const initialState: CardsState = {
  cards: []
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state: any, action: any) {
      if (action.payload.title) {
        state.cards.push({
          id: Date.now(),
          columnId: action.payload.columnId,
          title: action.payload.title,
          description: action.payload.description
        });
      }
    },
    editCard(state: any, action: any) {
      const findItem = state.cards.find((el: ICard) => el.id === action.payload.id);

      [findItem.title, findItem.description] = [action.payload.title, action.payload.description];
    },
    deleteCard(state: any, action: any) {
      state.cards = state.cards.filter((el: ICard) => el.id !== action.payload.id);
    }
  }
});

export const { addCard, editCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
