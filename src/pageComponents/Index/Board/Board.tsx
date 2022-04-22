import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ICard, IColumn, IComment } from "../../../types/interfaces";
import { useLocalStorage, useToggle } from "../../../customHooks";
import { selectUser, selectColumns } from "../../../store";

import { Column, CommentsList } from "../../../components";
import { Input, Modal, Textarea } from "../../../ui";
import { StyledBoard, BoardContainer, CardInfo, CardInfoTitle, CardForm, CardFormButton, CardInfoItem } from "./styles";

export const Board: React.FC = () => {
  // arrays
  const user =  useSelector(selectUser);
  const columns =  useSelector(selectColumns);

  const [cards, setCards] = useLocalStorage([], 'cards');
  const [comments, setComments] = useLocalStorage([], 'comments');

  // modals
  const [isModalInfoCard, toggleIsModalInfoCard] = useToggle(false);
  const [isModalAddCard, toggleIsModalAddCard] = useToggle(false);
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
  const onCardClick = (id: number) => {
    setCurrentCardId(id);
    toggleIsModalInfoCard();
  }

  const onAddCardClick = (id: number) => {
    setCurrentColumnId(id);
    toggleIsModalAddCard();
  }

  const handleAddCard: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputValue) {
      const card: ICard = {
        id: Date.now(),
        columnId: currentColumnId,
        title: inputValue,
        description: textareaValue
      }

      const newCards = [...cards, card];

      setCards(newCards);

      toggleIsModalAddCard();
      clearFormFields();
    }
  };

  const onEditCardClick = (id: number) => {
    setInputValue(cards.find((card: ICard) => card.id === id)?.title || '');
    setTextareaValue(cards.find((card: ICard) => card.id === id)?.description || '');
    toggleIsModalEditCard();
  }

  const handleEditCard: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const cardsDuplicate = [...cards];
    const findCard = cardsDuplicate.find((card: ICard) => card.id === currentCardId);

    if (findCard) {
      if (inputValue) findCard.title = inputValue;
      findCard.description = textareaValue;

      setCards(cardsDuplicate);
    }

    toggleIsModalEditCard();
    clearFormFields();
  };

  const deleteCard = (id: number) => {
    const newCards = cards.filter((card: ICard) => card.id !== id);
    const newComments = comments.filter((comment: IComment) => comment.cardId !== id);

    if (newCards && newComments) {
      setCards(newCards);
      setComments(newComments);

    }
  };

  // comments
  const addComment = (id: number, comment: string) => {
    const newComment = {
      id: Date.now(),
      cardId: id,
      userId: '',
      comment: comment
    };

    setComments([...comments, newComment])
  };

  const editComment = (id: number, comment: string) => {
    const commentsDuplicate = [...comments];
    const findComment = commentsDuplicate.find((comment: IComment) => comment.id === id);

    if (findComment) {
      findComment.comment = comment;

      setComments(commentsDuplicate);
    }
  };

  const deleteComment = (id: number) => {
    const newComments = comments.filter((comment: IComment) => comment.id !== id);

    if (newComments) {
      setComments(newComments);
    }
  };

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
                cards={cards.filter((card: ICard) => card.columnId === column.id)}
                onCardClick={onCardClick}
                onAddCardClick={() => onAddCardClick(column.id)}
                onEditCardClick={onEditCardClick}
                onDeleteCardClick={deleteCard}
              />
            )
          }
        </BoardContainer>
      </StyledBoard>

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
                    <h3>{columns.find((column: IColumn) => column.id === card.columnId)?.column}</h3>
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
                    <p></p>
                  </CardInfoItem>
                </CardInfo>
                <CommentsList
                  comments={comments.filter((comment: IComment) => comment.cardId === card.id)}
                  cardId={card.id}
                  addComment={addComment}
                  editComment={editComment}
                  deleteComment={deleteComment}
                />
              </div>
            )
          }
      </Modal>

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
    </>
  )
}
