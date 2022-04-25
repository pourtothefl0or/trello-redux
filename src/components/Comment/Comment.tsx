import React from 'react';
import { useToggle } from '../../customHooks';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../store';
import { useForm } from 'react-hook-form';
import { IComment } from '../../types/interface';
import { PopupMoreItem, Button, Input } from '../../ui';
import { StyledComment, CommentHeader, CommentUserLogo, CommentUserName, CommentPopupMore, CommentsText, CommentForm } from './styles';

interface CommentProps {
  name: string | undefined;
  comment: IComment;
}

interface CommentFields {
  commentText: string;
}

export const Comment: React.FC<CommentProps> = ({ name, comment, ...props }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue } = useForm<CommentFields>();

  const [isEditMode, toggleIsEditMode] = useToggle(false);

  const onEditClick = () => {
    setValue('commentText', comment.comment);
    toggleIsEditMode();
  }

  const handleEditComment = handleSubmit((data: CommentFields) => {
    dispatch(editComment({
      id: comment.id,
      comment: data.commentText
    }))
    toggleIsEditMode();
    reset();
  });

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
              {...register('commentText', { required: true, })}
            />
            <Button type="submit">Edit</Button>
          </CommentForm>
          :
          <CommentsText>{comment.comment}</CommentsText>

      }
    </StyledComment>
  )
}
