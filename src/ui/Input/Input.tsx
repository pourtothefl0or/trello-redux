import React from 'react';
import { StyledInput, Title, Field } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ title, ...props }, ref) => {
  return (
    <StyledInput>
      {
        title &&
          <Title>{title}</Title>
      }
      <Field
        ref={ref}
        {...props}
      />
    </StyledInput>
  )
});
