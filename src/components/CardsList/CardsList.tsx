import React from 'react';
import { useDispatch } from 'react-redux';
import { ICard, IComment } from '../../types/interface';
import { deleteCard } from '../../store';
import { Card } from '../';
import { CardAdd } from '../../ui';
import { CardsItem } from './styles';

interface CardsListProps {
  cards: ICard[];
  comments: IComment[];
  onAddCardClick: () => void;
  onEditCardClick: (id: number) => void;
  onCardClick: (id: number) => void;
}

export const CardsList: React.FC<CardsListProps> = ({ cards, comments, ...props }) => {
  const dispatch = useDispatch();

  const deleteItem = (id: number) => dispatch(deleteCard({ id: id }))

  return (
    <ul>
      {
        cards.map((card: ICard) =>
          <CardsItem key={card.id}>
            <Card
              title={card.title}
              commentsSum={
                comments
                  .filter((el: IComment) => el.cardId === card.id)
                  .length
                || 0
              }
              onDeleteClick={() => deleteItem(card.id)}
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
