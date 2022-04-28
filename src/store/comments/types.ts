export interface IComment {
  id: number;
  cardId: number;
  userId: number;
  comment: string;
}

export interface InitialState {
  comments: IComment[];
}
