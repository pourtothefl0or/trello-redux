import React from 'react';
import { ICard, IComment } from '../../types/interfaces';
import { CardFunctions } from '../../types/functions';
import { Card } from '../';
import { CardAdd } from '../../ui';
import { CardsItem } from './styles';

interface CardsListProps extends CardFunctions {
  cards: ICard[];
  comments: IComment[];
}

export const CardsList: React.FC<CardsListProps> = ({ cards, comments, ...props }) => {
  return (
    <ul>
      {
        cards.map((card: ICard) =>
          <CardsItem key={card.id}>
            <Card
              title={card.title}
              commentsSum={
                comments
                  .filter((comment: IComment) => comment.cardId === card.id)
                  .length
                || 0
              }
              onCardClick={() => props.onCardClick(card.id)}
              onEditCardClick={() => props.onEditCardClick(card.id)}
              onDeleteCardClick={() => props.onDeleteCardClick(card.id)}
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
