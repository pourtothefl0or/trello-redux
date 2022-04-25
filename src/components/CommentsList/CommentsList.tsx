import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions, selectors } from '../../store/ducks';
import { Comment } from '../';
import { Textarea, Button } from '../../ui';
import { StyledCommentsList, CommentItem, CommentForm } from './styles';
import { IUser, IComment } from '../../types/interface';

interface CommentsListProps {
  user: IUser;
  cardId: number;
}

interface CommentFields {
  cardDescription: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({ user, cardId }) => {
  const comments = useSelector(selectors.comments.filterCommentsByCardId(cardId));
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFields>();

  const handleAddComment = handleSubmit((data: CommentFields) => {
    dispatch(actions.comments.addComment({
      cardId: cardId,
      userId: user.id,
      comment: data.cardDescription
    }));
    reset();
  });

  return (
    <StyledCommentsList>
      {
        comments.map((comment: IComment) =>
          <CommentItem key={comment.id}>
            <Comment
              name={user.name}
              comment={comment}
            />
        </CommentItem>
        )
      }
      <CommentItem>
        <CommentForm onSubmit={handleAddComment}>
          <Textarea
            placeholder="Add a comment..."
            {...register('cardDescription', { required: true, })}
            className={errors.cardDescription && 'error'}
          />
          <Button>Add</Button>
        </CommentForm>
      </CommentItem>
    </StyledCommentsList>
  )
}
