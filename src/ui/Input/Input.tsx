import React from 'react';
import { StyledInput, Title, Field } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <StyledInput>
      {
        props.title &&
          <Title>{props.title}</Title>
      }
      <Field
        type={props.type}
        name={props.name}
        minLength={1}
        {...props}
      />
    </StyledInput>
  )
}
