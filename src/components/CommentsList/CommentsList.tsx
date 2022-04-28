import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { actions, selectors } from '../../store/ducks';
import { Comment } from '../';
import { Textarea, Button } from '../../ui';
import { StyledCommentsList, CommentItem, CommentForm } from './styles';

interface CommentsListProps {
  cardId: number;
}

interface CommentFields {
  cardDescription: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({ cardId }) => {
  const user = useSelector(selectors.user.selectUser);
  const comments = useSelector(selectors.comments.filterCommentsByCardId(cardId));
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<CommentFields>({ mode: 'onChange' });

  const handleAddComment = handleSubmit((data: CommentFields) => {
    dispatch(actions.comments.addComment({
      id: Date.now(),
      cardId: cardId,
      userId: user.id,
      comment: data.cardDescription
    }));
    reset();
  });

  return (
    <StyledCommentsList>
      {
        comments.map(comment =>
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
          <Button
            type="submit"
            disabled={!isValid}
          >Add</Button>
        </CommentForm>
      </CommentItem>
    </StyledCommentsList>
  )
}
