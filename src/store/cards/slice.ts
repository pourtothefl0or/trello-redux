import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types';
import { ICard } from '../../types/interface';

const initialState: InitialState = {
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
    editCard(state: any, { payload }: PayloadAction<Omit<ICard, 'columnId'>>) {
      const findItem = state.cards.find((el: ICard) => el.id === payload.id);

      [findItem.title, findItem.description] = [payload.title, payload.description];
    },
    deleteCard(state: any, { payload }: PayloadAction<{ id: number }>) {
      state.cards = state.cards.filter((el: ICard) => el.id !== payload.id);
    }
  }
});

export const actions = cardsSlice.actions;
export const reducers = cardsSlice.reducer;
