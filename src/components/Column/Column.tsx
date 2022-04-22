import React from 'react';
import { IColumn, ICard, IComment } from '../../types/interface';
import { ColumnHeader, CardsList } from '../';
import { StyledColumn } from './styles';

interface ColumnProps {
  column: IColumn;
  comments: IComment[];
  cards: ICard[];
  onAddCardClick: () => void;
  onEditCardClick: (id: number) => void;
  onCardClick: (id: number) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, cards, comments, ...props }) => {
  return (
    <StyledColumn>
      <ColumnHeader
        column={column}
        cardsSum={cards.length || 0}
      />
      <CardsList
        comments={comments}
        cards={cards}
        onAddCardClick={props.onAddCardClick}
        onEditCardClick={props.onEditCardClick}
        onCardClick={props.onCardClick}
      />
    </StyledColumn>
  )
}
