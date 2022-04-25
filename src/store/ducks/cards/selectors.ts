import { RootState } from '../../store';

export const selectCards = (state: RootState) => state.cards.cards;

export const filteredCardsByColumnId = (columnId: number) => {
  // return selectCards.filter((el: ICard) => el.columnId === columnId);
}


