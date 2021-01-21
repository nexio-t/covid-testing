/* eslint-disable */
import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import dayjs from "dayjs";
import ChartContainer from "components/ChartContainer";
import _ from "lodash";
import DataCard from "../components/DataCard";
import BarChart from "../components/BarChart";
import axios from "axios";

const formatData = (data) => {

  if (data.length !== 6 || data.length === 0 || data.length === undefined)
    return;

  return _.map(data, (day) => {
    const {
      deathIncrease,
      positiveIncrease,
      hospitalizedIncrease,
      dateChecked,
    } = day;

    const abridgedDate = dayjs(`${dateChecked}`).format("MMM D");

    return {
      deathIncrease,
      positiveIncrease,
      hospitalizedIncrease,
      abridgedDate,
    };
  });
};

const useFetchUSDailyTotals = () => {

  const [usaHistoricData, setUsaHistoricData] = useState([]);
  const [usaCurrentData, setUsaCurrentData] = useState([]);
  const [usaHistoricUrl, setUsaHistoricUrl] = useState(
    "https://api.covidtracking.com/v1/us/daily.json"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      try {

        setIsError(false);
        setIsLoading(true);

        const usaHistoricValues = await axios(usaHistoricUrl);
        const pastSevenDays = usaHistoricValues.data.slice(0, 6);
        const pastDay = usaHistoricValues.data.slice(0, 1);
        const formattedData = formatData(pastSevenDays);

        setUsaHistoricData(formattedData.reverse());
        setUsaCurrentData(pastDay[0]);
        setIsLoading(false);

      } catch (error) {

        setIsError(true);

      }
    };
    fetchData();
  }, [usaHistoricUrl]);

  return [{ usaHistoricData, usaCurrentData, isLoading }];
};

function Charts() {

  const [
    { usaHistoricData, usaCurrentData, isLoading }
  ] = useFetchUSDailyTotals();

  const positiveTestChange = [
    { values: usaHistoricData.map(({ positiveIncrease }) => positiveIncrease) }
  ];

  const deathsChange = [
    { values: usaHistoricData.map(({ deathIncrease }) => deathIncrease) }
  ];

  const hospitalizedChange = [
    {
      values: usaHistoricData.map(
        ({ hospitalizedIncrease }) => hospitalizedIncrease
      )
    }
  ];
  const dates = usaHistoricData.map(({ abridgedDate }) => abridgedDate);
  const { death, hospitalizedCumulative, positive } = usaCurrentData;

  const testData = {
    labels: dates,
    datasets: positiveTestChange
  };

  const deathData = {
    labels: dates,
    datasets: deathsChange
  };

  const hospitalizedData = {
    labels: dates,
    datasets: hospitalizedChange
  };

  const totalCasesData = {
    title: "Total Cases",
    total: positive
  };

  const totalHospData = {
    title: "Total Hospitalizations",
    total: hospitalizedCumulative
  };

  const totalDeathData = {
    title: "Total Deaths",
    total: death
  };

  return (
    <div>
      {!isLoading ? (
        <Layout>
          <h1 className="data-summary text-center"> U.S. Summary </h1>
          <ChartContainer className="data-chart-container">
            <div>
              <DataCard
                className="data-one text-center"
                data={totalCasesData}
              />
            </div>

            <div>
              <DataCard className="data-two text-center" data={totalHospData} />
            </div>

            <div>
              <DataCard
                className="data-three text-center"
                data={totalDeathData}
              />
            </div>

            <div className="chart-one text-center">
              <h2 className="graph-title">Daily New Cases</h2>
              <BarChart data={testData} />
            </div>

            <div className="chart-two text-center">
              <h2 className="graph-title">Daily New Hospitalizations</h2>
              <BarChart data={deathData} />
            </div>

            <div className="chart-three text-center">
              <h2 className="graph-title">Daily New Deaths</h2>
              <BarChart data={hospitalizedData} />
            </div>
          </ChartContainer>
        </Layout>
      ) : (
          <h1 className="text-center">Loading...</h1>
        )}
    </div>
  );
}

export default Charts;
/* eslint-disable */
