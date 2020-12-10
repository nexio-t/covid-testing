import React, { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import Container from 'components/Container';
import axios from "axios";

// Custom Hook To Fetch U.S. Daily Totals
const useFetchUSDailyTotals = () => {

  const [usDailyTotalData, setUsDailyTotalData] = useState({ dailyTotals: [] });
  const [url, setUrl] = useState(
    'https://api.covidtracking.com/v1/us/daily.json',
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(url);
        console.log("fetchUSDailyTotals result is: ", result); 
 
        setUsDailyTotalData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ usDailyTotalData, isLoading, isError }];
}

function Charts () {

    // Set a hook here that fetches USDailyTotals
    // Set another hook here that fetches some other data 
    // https://www.robinwieruch.de/react-hooks-fetch-data

  const [{ usDailyTotalData, isLoading, isError }] = useFetchUSDailyTotals(); 

  console.log("data-summary data is: ", data);
  console.log('dailyTotals is: ', dailyTotals); 
  console.log("data-summary isLoading is: ", isLoading); 
  console.log("data-summary isError is: ", isError); 

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