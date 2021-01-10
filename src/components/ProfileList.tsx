import styled from 'styled-components';

import SearchingPane from './SearchingPane';
import SearchingList from './SearchingList';
import FlatsPagination from './FlatsPagination';

const StyledProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1450px;
  background-color: aliceblue;
  @media (max-width: 768px) {
    margin: 0;
    min-width: 100px;
  };
  @media (max-width: 1024px) {
    margin: 0 10px;
    min-width: 100px;
  };
`;

type ProfileListProps = {
    flats: {
        [key: string]: string | string[];
    };
    totalPages: number
}

const ProfileList = ({ flats, totalPages }: ProfileListProps) => (
  <StyledProfileDiv>
    <SearchingPane />
    <SearchingList flats={flats} />
    <FlatsPagination count={totalPages} />
  </StyledProfileDiv>
);

export default ProfileList;
