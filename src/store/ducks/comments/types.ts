export interface IComment {
  id: number;
  cardId: number;
  userId: number;
  comment: string;
};

export interface CommentsState {
  comments: IComment[];
}
