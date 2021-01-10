import styled from 'styled-components';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import SearchingList from '../components/SearchingList';
import { API_SEARCH } from '../constants/constants';
import ErrorPage from '../components/ErrorPage';

type GetInitialProps = {
  asPath: string;
};
const StyledHeaderText = styled.h1`
  background-color: #3f51b5;
  color: white;
  border: white solid 3px;
  padding: 20px 40px;
`;
const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #3f51b5;
  width: 100%;
`;

const StyledMain = styled.main`
  padding: 16px 0;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 420px) {
    padding: 0;
    margin: 0;
  }
  @media (max-width: 1024px) {
    padding: 0;
    margin: 0;
  } ;
`;

type HomeProps = {
  flats: {
    data: Array<{
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
    error?: any;
  };
};

const Home = ({ flats }: HomeProps) => (
  <div className={styles.container}>
    <Head>
      <title>Search app</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StyledMain>
      <StyledHeaderContainer>
        <StyledHeaderText>Najdi domov</StyledHeaderText>
      </StyledHeaderContainer>
      {!flats.error ? <SearchingList flats={flats.data} totalPages={flats.totalPages} /> : <ErrorPage errorMessage={flats.error.message} />}
    </StyledMain>
    <footer className={styles.footer}>
      <div>@najdidomov.cz</div>
    </footer>
  </div>
);

Home.getInitialProps = async ({ asPath }: GetInitialProps) => {
  try {
    const res = await fetch(`${API_SEARCH}${asPath.substring(1)}`);
    const flats = await res.json();
    return { flats };
  } catch (error: any) {
    return { flats: { error } };
  }
};

export default Home;
