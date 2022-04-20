import React from 'react';
import { StyledTextarea, Title, Field } from './styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <StyledTextarea>
      {
        props.title &&
          <Title>{props.title}</Title>
      }
      <Field
        name={props.name}
        minLength={1}
        {...props}
      />
    </StyledTextarea>
  )
}
