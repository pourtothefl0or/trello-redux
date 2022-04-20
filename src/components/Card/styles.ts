import styled from 'styled-components';
import { COLORS, PRIMARY } from '../../constants';
import { PopupMore } from '../../ui';
import iconComments from '../../assets/images/icons/comments.svg';

export const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${PRIMARY.border};
  padding: 40px 20px 20px;
  background-color: ${COLORS.alabaster};
  cursor: pointer;
`;

export const CardPopupMore = styled(PopupMore)`
  position: absolute;
  top: 15px;
  right: 20px;
`;

export const CardTitle = styled.h2`
  overflow: hidden;
  display: -webkit-box;
  margin: 0 0 25px;
  width: 100%;
  font-size: 16px;
  color: ${COLORS.black};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const CardComments = styled.div`
  align-self: end;
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
  color: ${COLORS.topaz};
  background-image: url(${iconComments});
  background-size: 15px;
  background-position: left center;
  background-repeat: no-repeat;
`;
