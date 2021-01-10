import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DomainIcon from '@material-ui/icons/Domain';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { StylesProvider } from '@material-ui/core/styles';
import {
  LOCATION,
  DISPOSITION,
  DIMENSION,
  COMMISSION,
  EQUIPMENT,
  COST,
  BACK_TO_FLAT_OFFER, API_FLAT_DETAIL,
} from '../../src/constants/constants';
import ModalWindow from '../../src/components/ModalWindow';

const StyledList = styled(List)`
  width: 100%;
  padding: 0;
  max-width: 400px;
  background-color: white;
  margin: 0 0 10px;
  @media (max-width: 420px) {
    margin: 0;
  };
  @media (max-width: 1024px) {
    margin: 0;
  };
`;

const StyledMessageList = styled(List)`
  width: 100%;
  max-width: 1000px;
  background-color: white;
  margin: 0 0 30px 0;
  @media (max-width: 420px) {
    margin: 0;
  };
  @media (max-width: 1024px) {
    margin: 0;
  };
`;

const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  background-color: aliceblue;
  margin: 40px 120px 0 120px;
  @media (max-width: 420px) {
    margin: 0;
    flex-direction: column;
    align-items: center;
  };
  @media (max-width: 1024px) {
    margin: 20px;
    flex-direction: column;
    align-items: center;
  };`;

const StyledFlatDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMainListDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StyledButton = styled(Button)`
  margin: 40px 0 10px;
  max-height: 90px;
  @media (max-width: 420px) {
    margin: 0;
  };
  @media (max-width: 1024px) {
    margin: 0;
  };
`;

const Flat = ({ flat }: any) => (
  <StylesProvider injectFirst>
    <StyledContainerDiv>
      <StyledFlatDetailDiv>
        <h2>
          {flat.location}
          {' '}
          {flat.dimension}
          m2
        </h2>
        <StyledMainListDiv>
          <img src={flat.image} alt={`flat in ${flat.location}`} width="600" />
          <StyledList>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={LOCATION} secondary={flat.location} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DomainIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={DISPOSITION} secondary={flat.disposition} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={COST} secondary={flat.cost} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DashboardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={DIMENSION} secondary={flat.dimension} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EventSeatIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={EQUIPMENT} secondary={flat.equipment} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={COMMISSION} secondary={flat.commission} />
            </ListItem>
          </StyledList>
        </StyledMainListDiv>
        <StyledMessageList>
          <ListItem>
            {flat.message}
          </ListItem>
        </StyledMessageList>
      </StyledFlatDetailDiv>
      <div>
        <Link href="/">
          <StyledButton variant="contained" color="primary">{BACK_TO_FLAT_OFFER}</StyledButton>
        </Link>
        <ModalWindow />
      </div>
    </StyledContainerDiv>
  </StylesProvider>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${API_FLAT_DETAIL}${context.params.id}`);
  const flat = await res.json();

  return {
    props: { flat },
  };
};
export default Flat;
