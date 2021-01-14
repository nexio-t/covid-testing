import React, { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import Container from 'components/Container';
import ChartContainer from 'components/ChartContainer'; 
// import 'assets/stylesheets/components/_chartcontainer.scss';

import BarChartRace from "../components/BarChartRace";
import BarChart from "../components/BarChart";
import axios from "axios";

// Custom Hook To Fetch U.S. Daily Totals
const useFetchUSDailyTotals = () => {

  const [usaCurrentData, setUsaCurrentData] = useState({ dailyTotals: [] });
  const [stateHistoricalData, setStateHistoricalData] = useState({stateDailyTotals: []});
  const [stateCurrentData, setStateCurrentData] = useState({stateDailyTotals: []});
  const [usaHistoricData, setUsaHistoricData] = useState({ dailyTotals: [] });

  const [usaHistoricUrl, setUsaHistoricUrl] = useState('https://api.covidtracking.com/v1/us/daily.json');
  const [stateHistoricUrl, setStateHistoricUrl] = useState('https://api.covidtracking.com/v1/states/daily.json'); 
  const [stateCurrentUrl, setStateCurrentUrl] = useState('https://api.covidtracking.com/v1/states/current.json'); 
  const [sort, setSort] = useState(''); 

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {

    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const usaHistoricValues= await axios(usaHistoricUrl);
        const stateHistoricValues = await axios(stateHistoricUrl); 
        const stateCurrentValues = await axios(stateCurrentUrl)
        console.log("usaHistoricResult result is: ", usaHistoricValues); 
        console.log("stateHistoricResult is: ", stateHistoricValues);
        console.log("stateCurrentValues is :", stateCurrentValues);  
        setSort("ascending");

        setUsaHistoricData(usaHistoricValues.data);
        setStateHistoricalData(stateHistoricValues.data); 
        setStateCurrentData(stateCurrentValues.data)

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
 
    fetchData();
  }, [usaHistoricUrl]);
 
  return [{ usaCurrentData, stateHistoricalData, stateCurrentData, usaHistoricData, isLoading, isError, sort }];
}

function Charts () {

    // Set a hook here that fetches USDailyTotals
    // Set another hook here that fetches some other data 
    // https://www.robinwieruch.de/react-hooks-fetch-data

    // https://github.com/muratkemaldar/using-react-hooks-with-d3/tree/09-racing-bar-chart/src

  const [{ usaCurrentData, stateHistoricalData, stateCurrentData, usaHistoricData, isLoading, isError, sort }] = useFetchUSDailyTotals(); 

  console.log("usaHistoricData is: ", usaHistoricData)

  // Chart options
    // https://frappe.io/charts/docs/basic/basic_chart
    // https://www.reddit.com/r/reactjs/comments/9hnxee/which_chart_library_do_you_use_in_your_react_apps/
    // http://recharts.org/en-US/examples/SimpleBarChart
    // https://formidable.com/open-source/victory/gallery/alternative-events
    // https://github.com/wingedeel/AK-react-d3-barchart/blob/master/src/components/App.js
    // https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
    // Jan 14
      // check that the useEffect is rendering after each await in the fetch (comment out the other awaits)
      // check why the isLoading function ends in false 

  return (

    <div>
      {console.log("isLoading is: ", isLoading)}
      {isLoading ?  <Layout>
        <h1 className="text-center"> Data Summary </h1>
        <ChartContainer className="random-class">

          <div className="chart-one text-center">
            <h2>Daily New Cases </h2>
            <h5>New cases cases</h5>
            <BarChart data={usaHistoricData}/>
          </div>

          <div className="chart-two text-center">
            <h2>Daily New Hospitalizations</h2>
            <h5>New hospitalizations per day</h5>
            <BarChart data={usaHistoricData}/>
          </div>

          <div className="chart-three text-center">
            <h2>Daily New Deaths</h2>
            <h5>Deaths per Day</h5>
            <BarChart data={usaHistoricData}/>
          </div>
          
        </ChartContainer>
        {/* <Container type="content" className="text-center">
          
          <BarChartRace/>  
        
        </Container> */}
      </Layout> : <h1>loading</h1>}
    {/* {usaHistoricData &&} */}
    </div>
    
  );
};

export default Charts;