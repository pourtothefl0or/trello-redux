import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { Container } from '../../../components';

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const LoginTitle = styled.h2`
  margin: 0 0 20px;
  color: ${COLORS.black};
`;

export const LoginForm = styled.form`
  display: inline-flex;
  align-items: start;
  gap: 20px;

  @media (max-width: 599px) {
    flex-direction: column;
    align-items: center;
  }
`;
