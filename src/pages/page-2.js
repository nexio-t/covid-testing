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
        <div className="about-container">
        <h1 className="about-project">About this project</h1>
        <p className="paragraph-text">This mapping project uses public data from the <a href="https://covidtracking.com/">The Covid Tracking Project's API</a>, a volunteer-driven effort to collect the latest testing figures across all U.S. states and territories, led by <a href="https://www.theatlantic.com/"> The Atlantic.</a></p>

        <p className="paragraph-text"><strong>Why did I create this map?</strong> Like many others, I am closely following the infection, transmission, and testing rates across U.S. states. Despite the wealth of raw data offered by The COVID Tracking Project, I wanted a way to visualize the country's testing data, rather than having to work through tables. And so, I set out to create just that. By combining two APIs and adding coordinate data, I was able map testing progress across the country.</p>

        <p className="paragraph-text">All data is current and comes from The Covid Tracking Project's current state data endpoint, which is updated at least once daily, Monday through Friday, between 4PM and 5PM EDT by The Covid Tracking Project team.</p>
    
        <p className="paragraph-text">This project was completed by Tomas Gear.</p>

        </div>
 
      </Container>
    </Layout>
  );
};

export default SecondPage;
