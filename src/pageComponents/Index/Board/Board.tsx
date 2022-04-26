import React, { useState } from 'react';
import { useToggle } from '../../../customHooks';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../../store/ducks';
import { Column, CommentsList } from '../../../components';
import { Input, Modal, Textarea } from '../../../ui';
import { StyledBoard, BoardContainer, CardInfo, CardInfoTitle, CardForm, CardFormButton, CardInfoItem } from './styles';

interface BoardFields {
  cardTitle: string;
  cardDescription: string;
}

export const Board: React.FC = () => {
  const [currentCardId, setCurrentCardId] = useState(0);
  const [currentColumnId, setCurrentColumnId] = useState(0);

  const user = useSelector(selectors.user.selectUser);
  const columns = useSelector(selectors.columns.selectColumns);
  const cards = useSelector(selectors.cards.filterCardsById(currentCardId));

  const useFindCardById = (id: number) => useSelector(selectors.cards.findCardById(id)); // Fix!
  const useFindColumnById = (id: number) => useSelector(selectors.columns.findColumnsById(id)); // Fix!

  const dispatch = useDispatch();

  const [isModalAddCard, toggleIsModalAddCard] = useToggle(false);
  const [isModalInfoCard, toggleIsModalInfoCard] = useToggle(false);
  const [isModalEditCard, toggleIsModalEditCard] = useToggle(false);

  const {
    register: registerAddCard,
    handleSubmit: handleSubmitAddCard,
    reset: resetAddCard,
    formState: { errors: errorsAddCard }
  } = useForm<BoardFields>({ mode: 'onChange' });

  const {
    register: registerEditCard,
    handleSubmit: handleSubmitEditCard,
    reset: resetEditCard,
    setValue: setValueEditCard,
    formState: { errors: errorsEditCard }
  } = useForm<BoardFields>({ mode: 'onChange' });

  const onAddCardClick = (id: number) => {
    setCurrentColumnId(id);
    toggleIsModalAddCard();
  }

  const handleAddCard = handleSubmitAddCard((data: BoardFields) => {
    dispatch(actions.cards.addCard({
      id: Date.now(),
      columnId: currentColumnId,
      title: data.cardTitle,
      description: data.cardDescription
    }));
    toggleIsModalAddCard();
    resetAddCard();
  });

  const onEditCardClick = (id: number) => {
    setCurrentCardId(id);
    setValueEditCard('cardTitle', useFindCardById(id)?.title || '');
    setValueEditCard('cardDescription', useFindCardById(id)?.description || '');
    toggleIsModalEditCard();
  }

  const handleEditCard = handleSubmitEditCard((data: BoardFields) => {
    dispatch(actions.cards.editCard({
      id: currentCardId,
      title: data.cardTitle,
      description: data.cardDescription
    }))
    toggleIsModalEditCard();
    resetEditCard();
  });

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

      <Modal
        title="Add card"
        modalVisibility={isModalAddCard}
        onCloseClick={() => toggleIsModalAddCard()}
      >
        <CardForm onSubmit={handleAddCard}>
          <Input
            title="Title"
            type="text"
            {...registerAddCard('cardTitle', { required: true, })}
            className={errorsAddCard.cardTitle && 'error'}
          />
          <Textarea
            title="Description"
            {...registerAddCard('cardDescription')}
            className={errorsAddCard.cardDescription && 'error'}
          />
          <CardFormButton type="submit">Add</CardFormButton>
        </CardForm>
      </Modal>

      <Modal
        title="Edit card"
        modalVisibility={isModalEditCard}
        onCloseClick={() => toggleIsModalEditCard()}
      >
        <CardForm onSubmit={handleEditCard}>
          <Input
            title="Title"
            type="text"
            {...registerEditCard('cardTitle', { required: true, })}
            className={errorsEditCard.cardTitle && 'error'}
          />
          <Textarea
            title="Description"
            {...registerEditCard('cardDescription')}
            className={errorsEditCard.cardDescription && 'error'}
          />
          <CardFormButton type="submit">Edit</CardFormButton>
        </CardForm>
      </Modal>

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
                  <h3>{useFindColumnById(card.columnId)?.column || ''}</h3>
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
              <CommentsList
                user={user}
                cardId={card.id}
              />
            </div>
          )
        }
      </Modal>
    </>
  )
}
