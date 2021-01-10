import styled from 'styled-components';

import SearchingPane from './SearchingPane';
import ProfileList from './ProfileList';
import FlatsPagination from './FlatsPagination';

const StyledProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  @media (max-width: 420px) {
    margin: 0;
    min-width: 100px;
  }
  @media (max-width: 1024px) {
    margin: 0 10px;
    min-width: 100px;
  } ;
`;

type SearchingListProps = {
  flats: Array<{
    id: number;
    image: string;
    location: string;
    disposition: string;
    dimension: number;
    cost: number;
    commission: string;
    equipment: string;
  }>;
  totalPages: number;
};

const SearchingList = ({ flats, totalPages }: SearchingListProps) => (
  <StyledProfileDiv>
    <SearchingPane />
    <ProfileList flats={flats} />
    <FlatsPagination count={totalPages} />
  </StyledProfileDiv>
);

export default SearchingList;
