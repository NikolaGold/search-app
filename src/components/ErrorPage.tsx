import styled from 'styled-components';
import { ErrorMap } from '../constants/constants';

const StyledErrorPageDiv = styled.div`
    margin: 30px;
`;

type ErrorPageProps = {
    errorMessage: string
}

const ErrorPage = ({ errorMessage }: ErrorPageProps) => (
  <StyledErrorPageDiv>
    <h2>{ErrorMap.error}</h2>
    <div>{errorMessage && errorMessage}</div>
  </StyledErrorPageDiv>
);

export default ErrorPage;
