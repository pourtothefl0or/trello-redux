import React, { useState } from 'react';
import { IComment } from '../../types/interfaces';
import { CommentFunction } from '../../types/functions';
import { Comment } from '../';
import { Textarea, Button } from '../../ui';
import { StyledCommentsList, CommentItem, CommentForm } from './styles';

interface CommentsListProps extends CommentFunction {
  comments: IComment[];
  cardId: number;
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments, ...props }) => {
  const [textareaValue, setTextareaValue] = useState('');

  const handleAddComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (textareaValue) {
      props.addComment(props.cardId, textareaValue);
      setTextareaValue('');
    }
  }

  return (
    <StyledCommentsList>
      {
        comments.map((comment: IComment) =>
          <CommentItem key={comment.id}>
            <Comment
              name=""
              comment={comment}
              editComment={props.editComment}
              deleteComment={() => props.deleteComment(comment.id)}
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
