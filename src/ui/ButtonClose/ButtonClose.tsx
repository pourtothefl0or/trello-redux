import React from 'react';
import iconClose from '../../assets/images/icons/close.svg';
import { StyledButton } from './styles';

interface ButtonCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonClose: React.FC<ButtonCloseProps> = (props) => {
  return (
    <StyledButton
      className={props.className}
      {...props}
    >
      <img src={iconClose} alt="Button close" />
    </StyledButton>
  )
}
