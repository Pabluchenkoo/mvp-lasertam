import React from 'react';
import HomeCarousel from './HomeCarousel';
import { FormattedMessage } from 'react-intl';

const Home = () => {
    return (
        <>
            <br/>
            <br/>
            <HomeCarousel/>
            <br/>
            <br/>
            <hr/>

            <h4><FormattedMessage id="home.gestiona"/></h4>

        </>
    )
}
export default Home;