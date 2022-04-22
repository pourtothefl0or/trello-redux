import { RootState } from '../../store';

export const selectCards = (state: RootState) => state.cards.cards;

// фильтрация по ид
