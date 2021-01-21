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

        <p className="paragraph-text"><strong>Why did I create this map?</strong> Like many others, I am closely following COVID-19 data in the United States, and I wanted a way to map the country's testing data and chart summary figures.</p>

        <p className="paragraph-text">This map integrates three endpoints from two APIs. The first is the Historic U.S. Values endpoint from The Covid Tracking Project, which is used to populate the Charts page. The second endpoint is the Current Values for All States, also from The Covid Tracking Project, which contains testing data for all U.S. states. Finally, the second API is from Google Maps, which fetches coordinates data to map testing figures. 
        </p>

        <p className="paragraph-text">Endpoints from The Covid Tracking Project are updated at least once daily, Monday through Friday, between 4PM and 5PM EDT by The Covid Tracking Project team.</p>
    
        <p className="paragraph-text">This project was completed by Tomas Gear.</p>

        </div>
 
      </Container>
    </Layout>
  );
};

export default SecondPage;
