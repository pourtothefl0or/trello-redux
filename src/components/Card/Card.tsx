import React from 'react';
import { PopupMoreItem } from '../../ui';
import { StyledCard, CardPopupMore, CardTitle, CardComments } from './styles';

interface CardProps {
  title: string;
  commentsSum: number;
  onCardClick: () => void;
  onEditCardClick: () => void;
  onDeleteCardClick: () => void;
}

export const Card: React.FC<CardProps> = ({ title, commentsSum, ...props }) => {
  return (
    <StyledCard onClick={props.onCardClick}>
      <CardPopupMore>
        <PopupMoreItem
          className="edit"
          onClick={props.onEditCardClick}
        >Edit</PopupMoreItem>
        <PopupMoreItem
          className="delete"
          onClick={props.onDeleteCardClick}
        >Delete</PopupMoreItem>
      </CardPopupMore>
      <CardTitle>{title}</CardTitle>
      <CardComments>{commentsSum} comments</CardComments>
    </StyledCard>
  )
}
