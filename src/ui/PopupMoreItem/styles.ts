import styled from 'styled-components';
import { COLORS } from '../../constants';
import iconEdit from '../../assets/images/icons/edit.svg';
import iconDelete from '../../assets/images/icons/delete.svg';

export const StyledPopupMoreItem = styled.button`
  position: relative;
  margin: 0;
  padding: 10px 10px 10px 30px;
  width: 100%;
  font-size: 14px;
  text-align: left;
  color: ${COLORS.black};
  background-size: 16px;
  background-position: left 10px center;
  background-repeat: no-repeat;

  &.edit {
    background-image: url(${iconEdit});
  }

  &.delete {
    background-image: url(${iconDelete});
  }
`;
