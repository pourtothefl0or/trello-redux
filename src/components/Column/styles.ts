import styled from 'styled-components';
import { COLORS, PRIMARY } from '../../constants';

export const StyledColumn = styled.div`
  flex: 0 0 ${PRIMARY.column};
  padding: 0 20px 20px;
  border-radius: ${PRIMARY.border};
  height: 100%;
  background-color: ${COLORS.white};

  @media (max-width: 599px) {
    flex-basis: 100%;
  }
`;
