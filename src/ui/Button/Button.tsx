import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton
      className={props.className}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
