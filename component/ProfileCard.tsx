import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Link from 'next/link';

import ModalWindow from "./ModalWindow";
import React from "react";

type ProfileCardProps = {
    id: number
    image: string
    location: string
    disposition: string
    dimension: number
    cost: number
    commission: string
    equipment: string
}

const StyledCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const StyledCard = styled(Card)`
  margin: 5px;
  flex-basis: 24%;
  min-width: 300px;
  @media (max-width: 768px) {
    flex-basis: 100%
  };
  @media (max-width: 1024px) {
    flex-basis: 48%
  };
`;

const StyledButton = styled(Button)`
  margin-right: 2px;
`
const StyledChip = styled(Chip)`
  margin-right: 2px;
`
const StyledImg = styled.img`
  min-height: 100px;
  min-width: 200px;
  max-height: 300px;
  max-width: 300px;
`
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const StyledChips = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ProfileCard = ({id, image, location, disposition, dimension, cost, commission, equipment}: ProfileCardProps) => {
    return (
        <StyledCard>
            <StyledCardContent>
                <StyledImg src={image} alt={`flat in ${location}`}/>
                <StyledContent>
                    <h3>{location}</h3>
                    <div>{disposition}</div>
                    <div>{dimension} m2</div>
                    <div>{cost} Kč</div>
                    <StyledChips>
                        <StyledChip label={commission}/>
                        <Chip label={equipment}/>
                    </StyledChips>
                    <StyledCardDiv>
                        <Link href={`flat-detail/${id}`}><StyledButton variant="contained"
                                                                       color="primary">Detail</StyledButton></Link>
                        <ModalWindow/>
                    </StyledCardDiv>
                </StyledContent>
            </StyledCardContent>
        </StyledCard>
    )
}


export default ProfileCard;
