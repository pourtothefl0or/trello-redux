import React, { useState } from 'react';
import { useToggle } from '../../../hooks';
import { useSelector } from 'react-redux';
import { selectors } from '../../../store/ducks';
import { Column, CommentsList, ModalAddCard, ModalEditCard } from '../../../components';
import { Modal } from '../../../ui';
import { StyledBoard, BoardContainer, CardInfo, CardInfoTitle, CardInfoItem } from './styles';

export const Board: React.FC = () => {
  const [currentCardId, setCurrentCardId] = useState(0);
  const [currentColumnId, setCurrentColumnId] = useState(0);

  const user = useSelector(selectors.user.selectUser);
  const columns = useSelector(selectors.columns.selectColumns);
  const cards = useSelector(selectors.cards.filterCardsById(currentCardId));

  const [isModalAddCard, toggleIsModalAddCard] = useToggle(false);
  const [isModalEditCard, toggleIsModalEditCard] = useToggle(false);
  const [isModalInfoCard, toggleIsModalInfoCard] = useToggle(false);

  const onAddCardClick = (id: number) => {
    setCurrentColumnId(id);
    toggleIsModalAddCard();
  }

  const onEditCardClick = (id: number) => {
    setCurrentCardId(id);
    toggleIsModalEditCard();
  }

  const onCardClick = (id: number) => {
    setCurrentCardId(id);
    toggleIsModalInfoCard();
  }

  return (
    <>
      <StyledBoard>
        <BoardContainer>
          {
            columns.map(column =>
              <Column
                key={column.id}
                columnId={column.id}
                onAddCardClick={() => onAddCardClick(column.id)}
                onEditCardClick={onEditCardClick}
                onCardClick={onCardClick}
              />
            )
          }
        </BoardContainer>
      </StyledBoard>

      <ModalAddCard
        columnId={currentColumnId}
        isModal={isModalAddCard}
        toggleModal={toggleIsModalAddCard}
      />

      <ModalEditCard
        cardId={currentCardId}
        isModal={isModalEditCard}
        toggleModal={toggleIsModalEditCard}
      />

      <Modal
        title="Card info"
        modalVisibility={isModalInfoCard}
        onCloseClick={() => toggleIsModalInfoCard()}
      >
        {
          cards.map(card =>
            <div key={card.id}>
              <CardInfo>
                <CardInfoItem>
                  <CardInfoTitle>Column:</CardInfoTitle>
                  <h3>{columns.find(el => el.id === card.columnId)?.column || ''}</h3>
                </CardInfoItem>
                <CardInfoItem>
                  <CardInfoTitle>Title:</CardInfoTitle>
                  <h4>{card.title}</h4>
                </CardInfoItem>
                <CardInfoItem>
                  <CardInfoTitle>Description:</CardInfoTitle>
                  <p>{card.description}</p>
                </CardInfoItem>
                <CardInfoItem>
                  <CardInfoTitle>Author:</CardInfoTitle>
                  <p>{user.name}</p>
                </CardInfoItem>
              </CardInfo>
              <CommentsList cardId={card.id} />
            </div>
          )
        }
      </Modal>
    </>
  )
}
