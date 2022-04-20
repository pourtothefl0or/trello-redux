import styled from 'styled-components';
import { PRIMARY } from '../../constants';

export const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: calc(${PRIMARY.maxWidth} + 20px * 2);
`;
