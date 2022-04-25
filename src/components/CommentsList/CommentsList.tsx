import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IUser, IComment } from '../../types/interface';
import { addComment } from '../../store';
import { Comment } from '../';
import { Textarea, Button } from '../../ui';
import { StyledCommentsList, CommentItem, CommentForm } from './styles';

interface CommentsListProps {
  comments: IComment[];
  user: IUser;
  cardId: number;
}

interface CommentFields {
  cardDescription: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments, user, cardId }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<CommentFields>();

  const handleAddComment = handleSubmit((data: CommentFields) => {
    dispatch(addComment({
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
          />
          <Button>Add</Button>
        </CommentForm>
      </CommentItem>
    </StyledCommentsList>
  )
}
