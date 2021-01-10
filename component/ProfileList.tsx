import styled from 'styled-components';

import SearchingPane from "./SearchingPane";
import SearchingList from "./SearchingList";
import FlatsPagination from "./FlatsPagination";

const SyledProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  background-color: aliceblue;
  @media (max-width: 768px) {
    margin: 0;
  };
  @media (max-width: 1024px) {
    margin: 0 10px;
  };
`;
const ProfileList = ({flats, totalPages}: any) => {
    return (
        <SyledProfileDiv>
            <SearchingPane/>
            <SearchingList flats={flats}/>
            <FlatsPagination count={totalPages}/>
        </SyledProfileDiv>
    )
}

export default ProfileList;
