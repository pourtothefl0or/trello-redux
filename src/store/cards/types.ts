export interface ICard {
  id: number;
  columnId: number;
  title: string;
  description: string;
}

export interface InitialState {
  cards: ICard[];
}
