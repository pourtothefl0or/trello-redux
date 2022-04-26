import React from 'react';
import { PopupMoreItem } from '../../ui';
import { StyledCard, CardPopupMore, CardTitle, CardComments } from './styles';

interface CardProps {
  title: string;
  commentsSum: number;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onCardClick: () => void;
}

export const Card: React.FC<CardProps> = ({ title, commentsSum, ...props }) => {
  return (
    <StyledCard onClick={props.onCardClick}>
      <CardPopupMore>
        <PopupMoreItem
          className="edit"
          onClick={props.onEditClick}
        >Edit</PopupMoreItem>
        <PopupMoreItem
          className="delete"
          onClick={props.onDeleteClick}
        >Delete</PopupMoreItem>
      </CardPopupMore>
      <CardTitle>{title}</CardTitle>
      <CardComments>{commentsSum} comments</CardComments>
    </StyledCard>
  )
}
