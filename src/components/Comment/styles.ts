import styled from 'styled-components';
import { COLORS, PRIMARY } from '../../constants';
import { PopupMore } from '../../ui';

export const StyledComment = styled.div`
  border-radius: ${PRIMARY.border};
  padding: 15px;
  background-color: ${COLORS.alabaster};
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommentUserLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  font-size: 16px;
  text-transform: uppercase;
  color: ${COLORS.white};
  background-color: ${COLORS.amethyst};
`;

export const CommentUserName = styled.p`
  overflow: hidden;
  display: -webkit-box;
  margin: 0 10px;
  width: 100%;
  font-size: 16px;
  color: ${COLORS.black};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const CommentsText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${COLORS.black};
`;

export const CommentPopupMore = styled(PopupMore)`
  margin-left: auto;
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 599px) {
    flex-direction: column;
  }
`;
