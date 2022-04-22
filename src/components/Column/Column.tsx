import React from 'react';
import { ICard, IComment } from '../../types/interfaces';

import { IColumn } from '../../store/ducks/columns/types';
import { CardFunctions } from '../../types/functions';

import { ColumnHeader, CardsList } from '../';
import { StyledColumn } from './styles';

interface ColumnProps extends CardFunctions {
  column: IColumn;
  comments: IComment[];
  cards: ICard[];
}

export const Column: React.FC<ColumnProps> = ({ column, cards, comments, ...props}) => {
  return (
    <StyledColumn>
      <ColumnHeader
        column={column}
        cardsSum={cards.length || 0}
      />
      <CardsList
        comments={comments}
        cards={cards}
        onCardClick={props.onCardClick}
        onAddCardClick={props.onAddCardClick}
        onEditCardClick={props.onEditCardClick}
        onDeleteCardClick={props.onDeleteCardClick}
      />
    </StyledColumn>
  )
}
