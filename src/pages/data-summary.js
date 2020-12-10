import React from 'react';

import Layout from 'components/Layout';
import Container from 'components/Container';

function Charts () {


    // Set a hook here that fetches USDailyTotals
    // Set another hook here that fetches some other data 
    // https://www.robinwieruch.de/react-hooks-fetch-data

  useEffect(() => {
        const fetchUSDailyTotals = async () => {
            // define variable here 

        }

  }); 



  return (
    <Layout>
      <Container type="content" className="text-center">
        <h1>Page Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Container>
    </Layout>
  );
};

export default Charts;