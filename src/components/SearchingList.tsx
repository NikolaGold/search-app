import styled from 'styled-components';

import ProfileCard from './ProfileCard';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
`;

type SearchingListProps = {
  flats: {
    [key: string]: string | string[];
  };
}

const SearchingList = ({ flats }:SearchingListProps) => (
  <StyledDiv>
    {flats && Array.isArray(flats) && flats.map((element) => (
      <ProfileCard
        key={element.id}
        id={element.id}
        image={element.image}
        location={element.location}
        disposition={element.disposition}
        dimension={element.dimension}
        cost={element.cost}
        commission={element.commission}
        equipment={element.equipment}
      />
    ))}
  </StyledDiv>
);

export default SearchingList;
