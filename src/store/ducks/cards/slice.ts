import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsState } from './types';
import { ICard } from '../../../types/interface';

const initialState: CardsState = {
  cards: []
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, { payload }: PayloadAction<ICard>) {
      if (payload.title) {
        state.cards.push({
          id: payload.id,
          columnId: payload.columnId,
          title: payload.title,
          description: payload.description
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
