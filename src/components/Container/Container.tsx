import React from 'react';
import { StyledContainer } from './styles';

interface ContainerProps {
  className?: string;
  children: React.ReactChild | React.ReactNode;
}

export const Container: React.FC<ContainerProps> = (props) => {
  return (
    <StyledContainer className={props.className}>{props.children}</StyledContainer>
  )
}
