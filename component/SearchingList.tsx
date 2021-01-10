import ProfileCard from "./ProfileCard";
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
`;

const SearchingList = ({flats}) => {
    return (
        <StyledDiv>
            {flats && Array.isArray(flats) && Array.isArray(flats) && flats.map((element) =>
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
            )
            }
        </StyledDiv>
    )
}

export default SearchingList
