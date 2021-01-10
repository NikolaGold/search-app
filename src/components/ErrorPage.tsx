import styled from 'styled-components';
import { ErrorMap } from '../constants/constants';

type ErrorPageProps = {
    errorMessage: string
}

const StyledErrorPageDiv = styled.div`
    margin: 30px;
`;

const ErrorPage = ({ errorMessage }: ErrorPageProps) => (
  <StyledErrorPageDiv>
    <h2>{ErrorMap.error}</h2>
    <div>{errorMessage && errorMessage}</div>
  </StyledErrorPageDiv>
);

export default ErrorPage;
