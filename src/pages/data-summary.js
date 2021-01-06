import React, { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import Container from 'components/Container';
import BarChartRace from "../components/BarChartRace";
import axios from "axios";

// Custom Hook To Fetch U.S. Daily Totals
const useFetchUSDailyTotals = () => {

  const [usaCurrentData, setUsaCurrentData] = useState({ dailyTotals: [] });
  const [stateHistoricalData, setStateHistoricalData] = useState({stateDailyTotals: []});
  const [stateCurrentData, setStateCurrentData] = useState({stateDailyTotals: []});

  const [usaHistoricUrl, setUsaHistoricUrl] = useState('https://api.covidtracking.com/v1/us/daily.json');
  const [stateHistoricUrl, setStateHistoricUrl] = useState('https://api.covidtracking.com/v1/states/daily.json'); 
  const [stateCurrentUrl, setStateCurrentUrl] = useState('https://api.covidtracking.com/v1/states/current.json'); 
  const [sort, setSort] = useState(''); 

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const usaHistoricValues= await axios(usaHistoricUrl);
        const stateHistoricValues = await axios(stateHistoricUrl); 
        const stateCurrentValues = await axios(stateCurrentUrl)
        console.log("usaHistoricResult result is: ", usaHistoricValues); 
        console.log("stateHistoricResult is: ", stateHistoricValues);
        console.log("stateCurrentValues is :", stateCurrentValues);  
        setSort("ascending");

        setUsaCurrentData(usaHistoricValues.data);
        setStateHistoricalData(stateHistoricValues.data); 
        setStateCurrentData(stateCurrentValues.data)
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [usaHistoricUrl]);
 
  return [{ usaCurrentData, stateHistoricalData, stateCurrentData, isLoading, isError, sort }];
}

function Charts () {

    // Set a hook here that fetches USDailyTotals
    // Set another hook here that fetches some other data 
    // https://www.robinwieruch.de/react-hooks-fetch-data

    // https://github.com/muratkemaldar/using-react-hooks-with-d3/tree/09-racing-bar-chart/src

  const [{ usaCurrentData, stateHistoricalData, stateCurrentData, isLoading, isError, sort }] = useFetchUSDailyTotals(); 

  // console.log("data-summary data is: ", data);
  console.log('dailyTotals is: ', usaCurrentData); 
  console.log('stateHistoricalData is: ', stateHistoricalData); 
  console.log("stateCurrentData is: ", stateCurrentData); 
  console.log("data-summary isLoading is: ", isLoading); 
  console.log("data-summary isError is: ", isError); 

  // Chart options
    // https://frappe.io/charts/docs/basic/basic_chart
    // https://www.reddit.com/r/reactjs/comments/9hnxee/which_chart_library_do_you_use_in_your_react_apps/
    // http://recharts.org/en-US/examples/SimpleBarChart
    // https://formidable.com/open-source/victory/gallery/alternative-events
    // https://github.com/wingedeel/AK-react-d3-barchart/blob/master/src/components/App.js

  return (
    <Layout>
     
      <Container type="content" className="text-center">
        <h1>Page Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <p>hello</p>
        <BarChartRace/>        
      </Container>
    </Layout>
  );
};

export default Charts;