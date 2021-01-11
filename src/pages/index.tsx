import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

import styles from '../styles/Home.module.css';
import SearchingList from '../components/SearchingList';
import { API_SEARCH } from '../constants/constants';
import ErrorPage from '../components/ErrorPage';

type FlatProps = {
  id: number;
  image: string;
  location: string;
  disposition: string;
  dimension: number;
  cost: number;
  commission: string;
  equipment: string;
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
  error?: string;
};

const Home = ({ flats, error = '' }: HomeProps) => {
  const router = useRouter();
  const { query } = router;
  const data = getData(flats, query);
  return (
    <div className={styles.container}>
      <Head>
        <title>Search app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledMain>
        <StyledHeaderContainer>
          <StyledHeaderText>Najdi domov</StyledHeaderText>
        </StyledHeaderContainer>
        {!error ? <SearchingList flats={data.data} totalPages={data.totalPages} page={data.page} /> : <ErrorPage errorMessage={error} />}
      </StyledMain>
      <footer className={styles.footer}>
        <div>@najdidomov.cz</div>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(API_SEARCH);
    const data = await res.json();

    return {
      props: { flats: data },
    };
  } catch (error: any) {
    return { props: { error: String(error) } };
  }
};

export default Home;

function getData(data, query) {
  const flats = data;
  const page = Number(query.page || 1);
  const entriesPerPage = Number(query['entries-per-page']) || 8;

  const filteredFlats = filterFlats();
  const totalPages = Math.ceil(filteredFlats.length / entriesPerPage);

  return {
    data: paginateFlats(filteredFlats),
    totalPages,
    page,
  };

  function filterFlats(): Array<FlatProps> {
    const dimensionFrom = {
      getValue: () => Number(query['dimension-from']),
      apply: (value, flat: any) => flat.dimension >= value,
    };
    const dimensionTo = {
      getValue: () => Number(query['dimension-to']),
      apply: (value, flat: FlatProps) => flat.dimension <= value,
    };
    const costFrom = { getValue: () => Number(query['cost-from']), apply: (value, flat: any) => flat.cost >= value };
    const costTo = { getValue: () => Number(query['cost-to']), apply: (value, flat: any) => flat.cost <= value };
    const location = { getValue: () => query.location, apply: (value, flat: any) => flat.location === value };
    const equipment = {
      getValue: () => query.equipment,
      apply: (value, flat: FlatProps) => flat.equipment === value,
    };
    const commission = { getValue: () => query.commission, apply: (value, flat: any) => flat.commission === value };
    const disposition = {
      getValue: () => query.disposition,
      apply: (value, flat: FlatProps) => value.includes(flat.disposition),
    };
    const filters = [dimensionFrom, dimensionTo, costFrom, costTo, location, equipment, commission, disposition];
    return flats.filter((flat: FlatProps) => filters.every((filter) => applyFilter(flat, filter)));
  }

  function applyFilter(flat: FlatProps, filter: { getValue: Function; apply: Function }): Array<FlatProps> {
    const value = filter.getValue();
    return value ? filter.apply(value, flat) : true;
  }

  function paginateFlats(flatsPaginate: Array<FlatProps>): Array<FlatProps> {
    return flatsPaginate.slice((page - 1) * entriesPerPage, page * entriesPerPage);
  }
}
