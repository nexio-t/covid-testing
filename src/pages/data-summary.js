/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import Container from 'components/Container';
// var dayjs = require('dayjs')
import dayjs from 'dayjs'
import ChartContainer from 'components/ChartContainer'; 
// import 'assets/stylesheets/components/_chartcontainer.scss';
import _ from "lodash";
import DataCard from '../components/DataCard'; 
import BarChartRace from "../components/BarChartRace";
import BarChart from "../components/BarChart";
import axios from "axios";
// import Container from 'components/Container';




const formatData = (data) => {
  console.log("formatData fn data is: ", data); 
  console.log("formatData.length is: ", data.length); 

  if (data.length !== 6 || data.length === 0 || data.length === undefined) return; 

  // loop over that data here please and then commit \

  return _.map(data, day => {

    const {deathIncrease, positiveIncrease, hospitalizedIncrease, dateChecked } = day; 

    const abridgedDate = dayjs(`${dateChecked}`).format('MMM D'); 
    console.log("abridgeDate is: ", abridgedDate); 

    return {
      deathIncrease,
      positiveIncrease, 
      hospitalizedIncrease, 
      abridgedDate
    }

  })

}

// Custom Hook To Fetch U.S. Daily Totals
const useFetchUSDailyTotals = () => {

  // const [usaCurrentData, setUsaCurrentData] = useState({ dailyTotals: [] });
  // const [stateHistoricalData, setStateHistoricalData] = useState({stateDailyTotals: []});
  // const [stateCurrentData, setStateCurrentData] = useState({stateDailyTotals: []});
  const [usaHistoricData, setUsaHistoricData] = useState([]);
  const [usaCurrentData, setUsaCurrentData] = useState([]);


  const [usaHistoricUrl, setUsaHistoricUrl] = useState('https://api.covidtracking.com/v1/us/daily.json');
  // const [stateHistoricUrl, setStateHistoricUrl] = useState('https://api.covidtracking.com/v1/states/daily.json'); 
  // const [stateCurrentUrl, setStateCurrentUrl] = useState('https://api.covidtracking.com/v1/states/current.json'); 

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {

    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const usaHistoricValues= await axios(usaHistoricUrl);
        console.log("usaHistoricValues is: ", usaHistoricValues); 

        const pastSevenDays = usaHistoricValues.data.slice(0,6);
        const pastDay = usaHistoricValues.data.slice(0,1);
        console.log("pastDay is: ", pastDay[0]); 

        const formattedData = formatData(pastSevenDays)
        console.log("formattedData is: ", formattedData); 

        console.log("usaHistoricValues is: ", usaHistoricValues); 
        console.log("usaHistoricValues typeof data is: ", typeof usaHistoricValues.data)
        console.log("usaHistoricValues.data[0] is", usaHistoricValues.data.slice(0,6));
        console.log("usaHistoricValues.data.length is: ", usaHistoricValues.data.length); 

        setUsaHistoricData(formattedData);
        setUsaCurrentData(pastDay[0]); 
        // setStateHistoricalData(stateHistoricValues.data); 
        // setStateCurrentData(stateCurrentValues.data)

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
 
    fetchData();
  }, [usaHistoricUrl]);
 
  return [{  usaHistoricData, usaCurrentData, isLoading, isError }];
}

function Charts () {

    // Set a hook here that fetches USDailyTotals
    // Set another hook here that fetches some other data 
    // https://www.robinwieruch.de/react-hooks-fetch-data
    // https://github.com/muratkemaldar/using-react-hooks-with-d3/tree/09-racing-bar-chart/src

  const [{ usaHistoricData, usaCurrentData, isLoading, isError }] = useFetchUSDailyTotals(); 

  const positiveTestChange = [{ values: usaHistoricData.map(({ positiveIncrease}) => positiveIncrease)}]; 
  const deathsChange = [{ values: usaHistoricData.map(({ deathIncrease }) => deathIncrease)}];
  const hospitalizedChange = [{ values: usaHistoricData.map(({ hospitalizedIncrease}) => hospitalizedIncrease)}];
  const dates = usaHistoricData.map(({ abridgedDate}) => abridgedDate);

  const { death, hospitalizedCumulative, positive } = usaCurrentData; 



  console.log("positiveTestChange is: ", positiveTestChange); 

  console.log("usaCurrentData is: ", usaCurrentData); 


  const testData = {
    labels: dates,
    datasets: positiveTestChange
  }

  const deathData = {
    labels: dates,
    datasets: deathsChange
  }

  const hospitalizedData = {
    labels: dates,
    datasets: hospitalizedChange
  }

  const totalCasesData = {
    title: "Total Cases", 
    total: positive
  }

  const totalHospData = {
    title: "Total Hospitalizations", 
    total: hospitalizedCumulative
  }

  const totalDeathData = {
    title: "Total Deaths", 
    total: death
  }

  console.log("totalCasesData is: ", totalCasesData); 

  // const newCase = usaHistoricData.filter(data => return )
  // const newHospitalizations = 
  // const newDeaths = 
  // console.log("usaHistoricData[0] is: ", usaHistoricData); 

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
      {!isLoading ?  
      <Layout>
      <Container type="content">
      
        <h1 className="text-center"> Data Summary </h1>
        <ChartContainer className="random-class">

          <div>
            <DataCard className="data-one text-center" data={totalCasesData}/>
          </div>

          <div>
            <DataCard className="data-two text-center" data={totalHospData}/>
          </div>

          <div>
            <DataCard className="data-three text-center" data={totalDeathData}/>
          </div>

          <div className="chart-one text-center">
            <h2>Daily New Cases</h2>
            <BarChart data={testData}/>
          </div>

          <div className="chart-two text-center">
            <h2>Daily New Hospitalizations</h2>
            <BarChart data={deathData}/>
          </div>

          <div className="chart-three text-center">
            <h2>Daily New Deaths</h2>
            <BarChart data={hospitalizedData}/>
          </div>
          
        </ChartContainer>
        {/* <Container type="content" className="text-center">
          
          <BarChartRace/>  
        
        </Container> */}
        </Container>
      </Layout>  
      : <h1>loading</h1>}
    {/* {usaHistoricData &&} */}
    </div>
    
  );
};

export default Charts;
/* eslint-disable */