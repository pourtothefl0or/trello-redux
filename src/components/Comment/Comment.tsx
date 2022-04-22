import React, { useState } from 'react';
import { useToggle } from '../../customHooks';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../store';
import { IComment } from '../../types/interface';
import { PopupMoreItem, Button, Input } from '../../ui';
import { StyledComment, CommentHeader, CommentUserLogo, CommentUserName, CommentPopupMore, CommentsText, CommentForm } from './styles';

interface CommentProps {
  name: string | undefined;
  comment: IComment;
}

export const Comment: React.FC<CommentProps> = ({ name, comment, ...props }) => {
  const dispatch = useDispatch();

  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const [inputValue, setInputValue] = useState('');

  const onEditClick = () => {
    setInputValue(comment.comment);
    toggleIsEditMode();
  }

  const handleEditComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(editComment({
      id: comment.id,
      comment: inputValue
    }))
    toggleIsEditMode();
    setInputValue('');
  };

  const onDeleteItemClick = (id: number) => dispatch(deleteComment({ id: id }))

  return (
    <StyledComment>
      <CommentHeader>
        <CommentUserLogo>{name?.split('')[0]}</CommentUserLogo>
        <CommentUserName>{name}</CommentUserName>
        <CommentPopupMore>
          <PopupMoreItem
            className="edit"
            onClick={onEditClick}
          >Edit</PopupMoreItem>
          <PopupMoreItem
            className="delete"
            onClick={() => onDeleteItemClick(comment.id)}
          >Delete</PopupMoreItem>
        </CommentPopupMore>
      </CommentHeader>
      {
        isEditMode
          ?
            <CommentForm onSubmit={handleEditComment}>
            <Input
              type="text"
              name="commentText"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              required
            />
            <Button type="submit">Edit</Button>
          </CommentForm>
          :
          <CommentsText>{comment.comment}</CommentsText>

      }
    </StyledComment>
  )
}
