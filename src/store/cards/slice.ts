import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState, ICard } from './types';

const initialState: InitialState = {
  cards: []
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, { payload }: PayloadAction<ICard>) {
      state.cards.push(payload);
    },
    editCard(state, { payload }: PayloadAction<Omit<ICard, 'columnId'>>) {
      const findItem = state.cards.find((el: ICard) => el.id === payload.id);

      if (findItem) {
        findItem.title = payload.title;
        findItem.description = payload.description;
      }
    },
    deleteCard(state, { payload }: PayloadAction<{ id: number }>) {
      state.cards = state.cards.filter((el: ICard) => el.id !== payload.id);
    }
  }
});

export const actions = cardsSlice.actions;
export const reducers = cardsSlice.reducer;
