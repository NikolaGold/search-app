import styled from 'styled-components';

import ProfileCard from './ProfileCard';
import { NOT_FOUND_FLAT } from '../constants/constants';

const StyledDiv = styled.div`
  display: flex;
  min-height: 100px;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
`;

type ProfileListProps = {
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
};

const ProfileList = ({ flats }: ProfileListProps) => (
  <StyledDiv>
    {Array.isArray(flats) && flats.length >= 1
      ? flats.map((element) => (
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
        ))
      : NOT_FOUND_FLAT}
  </StyledDiv>
);

export default ProfileList;
