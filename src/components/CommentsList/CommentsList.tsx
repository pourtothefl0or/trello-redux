import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

export const CommentsList: React.FC<CommentsListProps> = ({ comments, user, cardId }) => {
  const dispatch = useDispatch();

  const [textareaValue, setTextareaValue] = useState('');

  const handleAddComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(addComment({
      cardId: cardId,
      userId: user.id,
      comment: textareaValue
    }))
    setTextareaValue('');
  }

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
            name="cardDescription"
            placeholder="Add a comment..."
            value={textareaValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value)}
            required
          />
          <Button>Add</Button>
        </CommentForm>
      </CommentItem>
    </StyledCommentsList>
  )
}
