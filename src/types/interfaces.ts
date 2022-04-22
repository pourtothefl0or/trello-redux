export interface IColumn {
  id: number;
  column: string;
};

export interface ICard {
  id: number;
  columnId: number;
  title: string;
  description: string;
};

export interface IComment {
  id: number;
  cardId: number;
  userId: number;
  comment: string;
};

