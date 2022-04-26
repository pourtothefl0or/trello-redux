import styled from 'styled-components';
import { COLORS, PRIMARY } from '../../../constants';
import { Container } from '../../../components';
import { Button } from '../../../ui';

export const StyledBoard = styled.section`
  overflow-x: auto;
  width: 100%;
  height: 100vh;
`;

export const BoardContainer = styled(Container)`
  display: flex;
  column-gap: 20px;
  padding-top: ${PRIMARY.containerIndent};
  padding-bottom: ${PRIMARY.containerIndent};
  height: 100%;
`;

export const CardInfo = styled.div`
  margin-bottom: 40px;
`;

export const CardInfoItem = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  h3,
  h4,
  p {
    margin: 0;
  }

  @media (max-width: 599px) {
    flex-direction: column;
    row-gap: 5px;
  }
`;

export const CardInfoTitle = styled.p`
  flex-shrink: 0;
  margin: 0;
  max-width: 125px;
  width: 125px;
  font-style: italic;
`;

export const CardInfoColumn = styled.h3`
  margin: 0 0 20px;
  color: ${COLORS.black};
`;

export const CardInfoDescription = styled.p`
  margin: 0 0 20px;
  color: ${COLORS.black};
`;

export const CardInfoAuthor = styled.p`
  margin: 0;
  color: ${COLORS.black};
`;


export const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const CardFormButton = styled(Button)`
  align-self: center;
`;
