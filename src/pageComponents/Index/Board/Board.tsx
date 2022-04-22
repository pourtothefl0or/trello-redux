import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "../../../customHooks";
import { ICard } from '../../../store/ducks/cards/types';
import { IColumn } from "../../../store/ducks/columns/types";
import { IComment } from "../../../store/ducks/comments/types";
import { selectUser, selectColumns, selectCards, selectComments, addCard, editCard } from "../../../store";
import { Column, CommentsList } from "../../../components";
import { Input, Modal, Textarea } from "../../../ui";
import { StyledBoard, BoardContainer, CardInfo, CardInfoTitle, CardForm, CardFormButton, CardInfoItem } from "./styles";

export const Board: React.FC = () => {
  const dispatch = useDispatch();

  // arrays
  const user =  useSelector(selectUser);
  const columns =  useSelector(selectColumns);
  const cards =  useSelector(selectCards);
  const comments =  useSelector(selectComments);

  // modals
  const [isModalAddCard, toggleIsModalAddCard] = useToggle(false);
  const [isModalInfoCard, toggleIsModalInfoCard] = useToggle(false);
  const [isModalEditCard, toggleIsModalEditCard] = useToggle(false);

  // values
  const [currentCardId, setCurrentCardId] = useState(0);
  const [currentColumnId, setCurrentColumnId] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const clearFormFields = () => {
    setInputValue('');
    setTextareaValue('');
  };

  // cards
  const onAddCardClick = (id: number) => {
    setCurrentColumnId(id);
    toggleIsModalAddCard();
  }

  const handleAddCard: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(addCard({
      columnId: currentColumnId,
      title: inputValue,
      description: textareaValue
    }));
    toggleIsModalAddCard();
    clearFormFields();
  }

  const onEditCardClick = (id: number) => {
    setCurrentCardId(id);
    setInputValue(cards.find((card: ICard) => card.id === id)?.title || '');
    setTextareaValue(cards.find((card: ICard) => card.id === id)?.description || '');
    toggleIsModalEditCard();
  }

  const handleEditCard: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(editCard({
      id: currentCardId,
      title: inputValue,
      description: textareaValue
    }))
    toggleIsModalEditCard();
    clearFormFields();
  };

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
        onCloseClick={() => {
          toggleIsModalAddCard();
          clearFormFields();
        }}
      >
        <CardForm onSubmit={handleAddCard}>
          <Input
            title="Title"
            type="text"
            name="cardTitle"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            required
          />
          <Textarea
            title="Description"
            name="cardDescription"
            value={textareaValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
          />
          <CardFormButton type="submit">Add</CardFormButton>
        </CardForm>
      </Modal>

      <Modal
        title="Edit card"
        modalVisibility={isModalEditCard}
        onCloseClick={() => {
          toggleIsModalEditCard()
          clearFormFields();
        }}
      >
        <CardForm onSubmit={handleEditCard}>
          <Input
            title="Title"
            type="text"
            name="cardTitle"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            required
          />
          <Textarea
            title="Description"
            name="cardDescription"
            value={textareaValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
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
