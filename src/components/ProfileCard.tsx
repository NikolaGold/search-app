import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Link from 'next/link';

import React from 'react';
import ModalWindow from './ModalWindow';

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const StyledCard = styled(Card)`
  width: 100%;
  margin: 5px;
  flex-basis: 24%;
  @media (max-width: 420px) {
    flex:auto;
  };
  @media (max-width: 1024px) {
    flex-basis: 48%
  };
`;

const StyledButton = styled(Button)`
  margin-right: 2px;
`;
const StyledChip = styled(Chip)`
  margin-right: 2px;
`;
const StyledImg = styled.img`
  min-width: 200px;
  max-width: 300px;
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledChips = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const ProfileCard = ({
  id, image, location, disposition, dimension, cost, commission, equipment,
}: ProfileCardProps) => (
  <StyledCard>
    <StyledCardContent>
      <StyledImg src={image} alt={`flat in ${location}`} />
      <StyledContent>
        <h3>{location}</h3>
        <div>{disposition}</div>
        <div>
          {dimension}
          {' '}
          m2
        </div>
        <div>
          {cost}
          {' '}
          Kč
        </div>
        <StyledChips>
          <StyledChip label={commission} />
          <Chip label={equipment} />
        </StyledChips>
        <StyledButtonContainer>
          <Link href={`flat-detail/${id}`}>
            <StyledButton
              variant="contained"
              color="primary"
            >
              Detail
            </StyledButton>
          </Link>
          <ModalWindow />
        </StyledButtonContainer>
      </StyledContent>
    </StyledCardContent>
  </StyledCard>
);

export default ProfileCard;
