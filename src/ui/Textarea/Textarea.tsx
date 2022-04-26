import React from 'react';
import { StyledTextarea, Title, Field } from './styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
  title?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ title, ...props }, ref) => {
  return (
    <StyledTextarea>
      {
        title &&
          <Title>{title}</Title>
      }
      <Field
        ref={ref}
        {...props}
      />
    </StyledTextarea>
  );
});
