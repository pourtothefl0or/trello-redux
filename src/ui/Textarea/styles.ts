import styled from 'styled-components';
import { COLORS, PRIMARY } from '../../constants';

export const StyledTextarea = styled.label`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
`;

export const Title = styled.span`
  margin: 0;
  font-size: 16px;
  color: ${COLORS.black};
`;

export const Field = styled.textarea`
  border-radius: ${PRIMARY.border};
  border: 1px solid ${COLORS.topaz};
  padding: 20px;
  width: 100%;
  min-height: 100px;
  background-color: ${COLORS.white};
  resize: none;

  &.error {
    border-color: ${COLORS.red};
  }
`;
