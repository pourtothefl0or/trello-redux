import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from '../../../customHooks';
import { IColumn, ICard, IComment } from '../../../types/interface';
import { selectUser, selectColumns, selectCards, selectComments, addCard, editCard } from '../../../store';
import { useForm } from 'react-hook-form';
import { Column, CommentsList } from '../../../components';
import { Input, Modal, Textarea } from '../../../ui';
import { StyledBoard, BoardContainer, CardInfo, CardInfoTitle, CardForm, CardFormButton, CardInfoItem } from './styles';

interface BoardFields {
  cardTitle: string;
  cardDescription: string;
}

export const Board: React.FC = () => {
  const dispatch = useDispatch();

  // arrays
  const user = useSelector(selectUser);
  const columns = useSelector(selectColumns);
  const cards = useSelector(selectCards);
  const comments = useSelector(selectComments);

  // modals
  const [isModalAddCard, toggleIsModalAddCard] = useToggle(false);
  const [isModalInfoCard, toggleIsModalInfoCard] = useToggle(false);
  const [isModalEditCard, toggleIsModalEditCard] = useToggle(false);

  // values
  const {
    register: registerAddCard,
    handleSubmit: handleSubmitAddCard,
    reset: resetAddCard
  } = useForm<BoardFields>();

  const {
    register: registerEditCard,
    handleSubmit: handleSubmitEditCard,
    reset: resetEditCard,
    setValue: setValueEditCard
  } = useForm<BoardFields>();

  const [currentCardId, setCurrentCardId] = useState(0);
  const [currentColumnId, setCurrentColumnId] = useState(0);

  // cards
  const onAddCardClick = (id: number) => {
    setCurrentColumnId(id);
    toggleIsModalAddCard();
  }

  const handleAddCard = handleSubmitAddCard((data: BoardFields) => {
    dispatch(addCard({
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
    setValueEditCard('cardTitle', cards.find((card: ICard) => card.id === id)?.title || '');
    setValueEditCard('cardDescription', cards.find((card: ICard) => card.id === id)?.description || '');
    toggleIsModalEditCard();
  }

  const handleEditCard = handleSubmitEditCard((data: BoardFields) => {
    dispatch(editCard({
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
                column={column}
                comments={comments}
                cards={cards.filter(el => el.columnId === column.id)}
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
          />
          <Textarea
            title="Description"
            {...registerAddCard('cardDescription')}
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
          />
          <Textarea
            title="Description"
            {...registerEditCard('cardDescription', { required: true, })}
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
          cards
            .filter((item: ICard) => item.id === currentCardId)
            .map((card: ICard) =>
              <div key={card.id}>
                <CardInfo>
                  <CardInfoItem>
                    <CardInfoTitle>Column:</CardInfoTitle>
                    <h3>{columns.find((el: IColumn) => el.id === card.columnId)?.column}</h3>
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
                  comments={comments.filter((comment: IComment) => comment.cardId === card.id)}
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
