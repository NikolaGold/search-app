import styled from 'styled-components';

import ProfileCard from './ProfileCard';
import { NOT_FOUND_FLAT } from '../constants/constants';

const StyledDiv = styled.div`
  display: flex;
  min-height: 100px;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;

type SearchingListProps = {
  flats: Array<{
    id: number
    image: string
    location: string
    disposition: string
    dimension: number
    cost: number
    commission: string
    equipment: string
  }>;

}

const SearchingList = ({ flats }:SearchingListProps) => (
  <StyledDiv>
    {Array.isArray(flats) && flats.length >= 1 ? flats.map((element) => (
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
    )) : NOT_FOUND_FLAT}
  </StyledDiv>
);

export default SearchingList;
