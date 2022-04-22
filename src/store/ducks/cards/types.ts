export interface ICard {
  id: number;
  columnId: number;
  title: string;
  description: string;
};

export interface CardsState {
  cards: ICard[];
}
