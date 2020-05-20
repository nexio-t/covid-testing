import React from 'react';
import Helmet from 'react-helmet';

import Layout from 'components/Layout';
import Container from 'components/Container';

const SecondPage = () => {
  return (
    <Layout pageName="two">
      <Helmet>
        <title>About</title>
      </Helmet>
      <Container type="content" className="text-center">
        <div>
        <h1 className="about-project">About this project</h1>
        <p className="paragraph-text">This mapping project uses public data from the <a href="https://covidtracking.com/">The Covid Tracking Project's API</a>, a volunteer-driven effort to collect the latest testing figures across all U.S. states and territories, led by <a href="https://www.theatlantic.com/"> The Atlantic.</a></p>

        <p className="paragraph-text">All data is current and comes from the current state data endpoint, which is updated at least once daily between 4PM and 5PM EDT by The Covid Tracking Project team.</p>
    
        <p className="paragraph-text">This project was completed by Tomas Gear.</p>

        </div>
 
      </Container>
    </Layout>
  );
};

export default SecondPage;
