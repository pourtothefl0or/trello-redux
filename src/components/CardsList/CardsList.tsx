import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../../store/ducks';
import { Card } from '../';
import { CardAdd } from '../../ui';
import { CardsItem } from './styles';
import { ICard } from '../../types/interface';

interface CardsListProps {
  columnId: number;
  onAddCardClick: () => void;
  onEditCardClick: (id: number) => void;
  onCardClick: (id: number) => void;
}

export const CardsList: React.FC<CardsListProps> = ({ columnId, ...props }) => {
  const cards = useSelector(selectors.cards.filterCardsByColumnId(columnId));
  const useFilteredComments = (id: number) => useSelector(selectors.comments.filterCommentsByCardId(id)); // Fix!
  const dispatch = useDispatch();

  const onDeleteClick = (id: number) => dispatch(actions.cards.deleteCard({ id: id }))

  return (
    <ul>
      {
        cards.map((card: ICard) =>
          <CardsItem key={card.id}>
            <Card
              title={card.title}
              commentsSum={useFilteredComments.length || 0}
              onDeleteClick={() => onDeleteClick(card.id)}
              onEditClick={() => props.onEditCardClick(card.id)}
              onCardClick={() => props.onCardClick(card.id)}
            />
          </CardsItem>
        )
      }
      <CardsItem>
        <CardAdd onClick={props.onAddCardClick} />
      </CardsItem>
    </ul>
  )
}
