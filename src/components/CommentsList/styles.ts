import styled from 'styled-components';

export const StyledCommentsList = styled.ul`
  margin-bottom: 40px;
`;

export const CommentItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: start;
  gap: 20px;

  @media (max-width: 599px) {
    flex-direction: column;
    align-items: center;
  }
`;
