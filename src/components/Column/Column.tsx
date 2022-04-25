import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../store/ducks';
import { ColumnHeader, CardsList } from '../';
import { StyledColumn } from './styles';

interface ColumnProps {
  columnId: number;
  onAddCardClick: () => void;
  onEditCardClick: (id: number) => void;
  onCardClick: (id: number) => void;
}

export const Column: React.FC<ColumnProps> = ({ columnId, ...props }) => {
  const cards = useSelector(selectors.cards.filterCardsByColumnId(columnId));

  return (
    <StyledColumn>
      <ColumnHeader
        columnId={columnId}
        cardsSum={cards.length || 0}
      />
      <CardsList
        columnId={columnId}
        onAddCardClick={props.onAddCardClick}
        onEditCardClick={props.onEditCardClick}
        onCardClick={props.onCardClick}
      />
    </StyledColumn>
  )
}
