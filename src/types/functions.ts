import { IColumn } from "./interfaces";

export interface ColumnFunctions {
  editColumn: (values: IColumn) => void;
}

export interface CardFunctions {
  onCardClick: (id: number) => void;
  onAddCardClick: () => void;
  onEditCardClick: (id: number) => void;
  onDeleteCardClick: (id: number) => void;
}

export interface CommentFunction {
  addComment: (id: number, comment: string) => void;
  editComment: (id: number, comment: string) => void;
  deleteComment: (id: number) => void;
}
