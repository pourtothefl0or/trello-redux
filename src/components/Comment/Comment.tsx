import React, { useState } from 'react';
import { IComment } from '../../types/interfaces';
import { PopupMoreItem, Button, Input } from '../../ui';
import { StyledComment, CommentHeader, CommentUserLogo, CommentUserName, CommentPopupMore, CommentsText, CommentForm } from './styles';

interface CommentProps {
  name: string | undefined;
  comment: IComment;
  editComment: (id: number, comment: string) => void;
  deleteComment: () => void;
}

export const Comment: React.FC<CommentProps> = ({ name, comment, ...props}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEditComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputValue) props.editComment(comment.id, inputValue);

    setIsEditMode(!isEditMode);
    setInputValue('');
  };

  return (
    <StyledComment>
      <CommentHeader>
        <CommentUserLogo>{name?.split('')[0]}</CommentUserLogo>
        <CommentUserName>{name}</CommentUserName>
        <CommentPopupMore>
          <PopupMoreItem
          className="edit"
            onClick={() => {
              setInputValue(comment.comment);
              setIsEditMode(!isEditMode);
            }}
          >Edit</PopupMoreItem>
          <PopupMoreItem
            className="delete"
            onClick={props.deleteComment}
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
