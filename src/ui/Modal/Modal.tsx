import React from 'react';
import { ButtonClose } from '../ButtonClose';
import { ModalInner, StyledModal, ModalContainer, ModalButtons, ModalTitle } from './styles';

interface ModalProps {
  className?: string;
  title: string;
  modalVisibility: boolean;
  onCloseClick: () => void;
  children: React.ReactChild | React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, modalVisibility, children, onCloseClick, ...props }) => {
  return (
    <ModalInner
      className={modalVisibility ? 'is-open' : ''}
      onClick={onCloseClick}
    >
      <StyledModal onClick={e => e.stopPropagation()}>
        <ModalContainer className={props.className}>
          <ModalButtons>
            <ButtonClose onClick={onCloseClick} />
          </ModalButtons>
          <ModalTitle>{title}</ModalTitle>
          {children}
        </ModalContainer>
      </StyledModal>
    </ModalInner>
  )
}
