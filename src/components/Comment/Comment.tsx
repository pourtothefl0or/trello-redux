import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../customHooks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions } from '../../store/ducks';
import { PopupMoreItem, Button, Input } from '../../ui';
import { StyledComment, CommentHeader, CommentUserLogo, CommentUserName, CommentPopupMore, CommentsText, CommentForm } from './styles';
import { IComment } from '../../types/interface';

interface CommentProps {
  name: string | undefined;
  comment: IComment;
}

interface CommentFields {
  commentText: string;
}

export const Comment: React.FC<CommentProps> = ({ name, comment }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CommentFields>({ mode: 'onChange' });

  const rootRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);
  useOnClickOutside(rootRef, () => setIsEditMode(false));

  const onEditClick = () => {
    setValue('commentText', comment.comment);
    setIsEditMode(!isEditMode);
  }

  const handleEditComment = handleSubmit((data: CommentFields) => {
    dispatch(actions.comments.editComment({
      id: comment.id,
      comment: data.commentText
    }))
    setIsEditMode(!isEditMode);
    reset();
  });

  const onDeleteItemClick = (id: number) => dispatch(actions.comments.deleteComment({ id: id }))

  return (
    <StyledComment ref={rootRef}>
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
              className={errors.commentText && 'error'}
            />
            <Button type="submit">Edit</Button>
          </CommentForm>
          :
          <CommentsText>{comment.comment}</CommentsText>

      }
    </StyledComment>
  )
}
