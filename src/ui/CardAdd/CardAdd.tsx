import React from 'react';
import { StyledCardAdd } from './styles';

interface CardAddProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CardAdd: React.FC<CardAddProps> = (props) => {
  return (
    <StyledCardAdd
      className={props.className}
      {...props}
    >
      + Add new card
    </StyledCardAdd>
  )
}
