import React from 'react';
import { StyledPopupMoreItem } from './styles';

interface PopupMoreItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PopupMoreItem: React.FC<PopupMoreItemProps> = ({ children, ...props }) => {
  return (
    <li>
      <StyledPopupMoreItem {...props}>{children}</StyledPopupMoreItem>
    </li>
  )
}
