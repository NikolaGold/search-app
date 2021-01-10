import styled from 'styled-components';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import ProfileList from "../component/ProfileList";
import {API_SEARCH} from "../constant/constants";

const StyledHeaderText = styled.h1`
  background-color: #3f51b5;
  color: white;
  border: white solid 3px;
  padding: 20px 40px;
`
const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #3f51b5;
  width: 100%;
`

const Home = ({flats}: any) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Search app</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <StyledHeaderContainer><StyledHeaderText>Najdi domov</StyledHeaderText></StyledHeaderContainer>
                <ProfileList flats={flats.data} totalPages={flats.totalPages}/>
            </main>
            <footer className={styles.footer}>
                <div>@najdidomov.cz</div>
            </footer>
        </div>
    )
}

Home.getInitialProps = async ({asPath}) => {
    const res = await fetch(`${API_SEARCH}${(asPath).substring(1)}`)
    const flats = await res.json()
    return {flats}
}

export default Home;