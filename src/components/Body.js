import React from "react";
import Line from "./LineGraph";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Nav, Table } from "react-bootstrap";
import _ from "lodash";

import CovidFirstImage from "../images/covid19.image.jpeg";
import ChartistGraph from "react-chartist";
import Chartist from "chartist";
import { Link } from "react-router-dom";
import TableData from "./TableData";

// Hook is a features that let use state without using class
//When using hooks we get the previous value of props or state
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  //useRef returns a mutable ref object.
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default function Body() {
  //test
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState([]); // initialaise with empty array
  const [displayCharts, setDisplayCharts] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [infectionRateChartData, setInfectionRateChartData] = useState({});
  const [newDeathsData, setNewDeathsData] = useState({});
  const [caseDensityData, setCaseDensityData] = useState({});
  const [vaccinationsCompletedData, setVaccinationsCompletedData] = useState(
    {}
  );
  const prevSelectedState = usePrevious(selectedState); // usePrevious hook for storing previous value of state

  var options = {
    width: 500,
    height: 400,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 2 === 0 ? value : null;
      },
      showLabel: true,
    },
  };
  var fakelabel = ["1", "2", "3"];
  useEffect(() => {
    getDataFromAxios();
    getTimeSeriesData();
  }, []);

  const isChanged = !_.isEqual(prevSelectedState, selectedState);

  useEffect(() => {
    console.log({ selectedStateValue: selectedState });
    if (selectedState && selectedState[0]) {
      giveChartData();
    }
  }, [isChanged]); // call giveChartData function once isChanged is changed

  const getDataFromAxios = async () => {
    const dataFromAxios = await axios
      .get(
        `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`
      )
      .then((result) => {
        setData(result.data);
      });
  };

  const getTimeSeriesData = async () => {
    const dataFromAxios = await axios
      .get(
        `https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`
      )
      .then((result) => {
        setChartData(result.data);
      });
  };

  const handleRowClick = (key) => {
    const state = data.filter((obj) => obj.state === key);
    console.log({ state });
    setSelectedState(state); // setstate is asynchronous so immediately on next line we will not get updated value so we're usign useEffect to call the giveChartData once the state is updated
  };

  const giveChartData = () => {
    if (selectedState && selectedState[0]) {
      console.log("inside_state", selectedState);
      // This contains all the data for every chart
      let dataToGiveCharts = chartData.filter(
        (obj) => obj.state === selectedState[0]?.state
      );
      console.log({ selectedState });

      //INFECTION RATE DATA (#1)
      const metricDataToGiveCharts =
        dataToGiveCharts[0]?.metricsTimeseries?.slice(600, -5);
      const labels = metricDataToGiveCharts?.map(
        (obj, indx) => indx % 7 == 0 && obj.date
      );
      const infectionRateSeries = metricDataToGiveCharts?.map(
        (obj) => obj.infectionRate
      );
      setInfectionRateChartData({
        labels: labels,
        series: [infectionRateSeries],
      });
      let chart = new Chartist.Line(
        "#chart1",
        { labels: labels, series: [infectionRateSeries] },
        options
      );

      //NEW DEATHS DATA (#2)
      const actualsTimeSeries = dataToGiveCharts[0]?.actualsTimeseries?.slice(
        600,
        -5
      );
      const newDeathsSeries = actualsTimeSeries?.map((obj) => obj.newDeaths);
      setNewDeathsData({ labels: labels, series: [newDeathsSeries] });
      let chart2 = new Chartist.Line(
        "#chart2",
        { labels: labels, series: [newDeathsSeries] },
        options
      );

      //CASE DENSITY DATA (#3)
      console.log("data", metricDataToGiveCharts);
      const caseDensitySeries = metricDataToGiveCharts?.map(
        (obj) => obj.caseDensity
      );
      let chart3 = new Chartist.Line(
        "#chart3",
        { labels: labels, series: [caseDensitySeries] },
        options
      );
      setCaseDensityData({ labels: labels, series: caseDensitySeries });

      //VACCINATIONS COMPLETED (#4)
      const vaccinationsCompletedSeries = metricDataToGiveCharts?.map(
        (obj) => obj.vaccinationsCompletedRatio
      );
      let chart4 = new Chartist.Line(
        "#chart4",
        { labels: labels, series: [vaccinationsCompletedSeries] },
        options
      );
      setVaccinationsCompletedData({
        labels: labels,
        series: vaccinationsCompletedSeries,
      });

      setDisplayCharts(true);
    }
  };

  const handleImageClick = () => {
    alert("image clicked");
  };

  return (
    <div>
      {displayCharts && (
        <div className="image-nav">
          <img
            src={CovidFirstImage}
            alt="First Covid 19"
            onClick={handleImageClick}
          />
          <div>
            <div>State: {selectedState[0]?.state}</div>
            <div>Population: {selectedState[0]?.population}</div>
            <div>New Cases: {selectedState[0]?.actuals?.newCases}</div>
            <div>Risk Levels: {selectedState[0]?.riskLevels?.overall}</div>
          </div>
          <img
            src={CovidFirstImage}
            alt="Second Covid 19"
            onClick={handleImageClick}
          />
        </div>
      )}
      <div>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">USA</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/">World</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Go Back</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {displayCharts && (
        <div className="image-nav">
          <img
            src={CovidFirstImage}
            alt="First Covid 19"
            onClick={handleImageClick}
          />
          <img
            src={CovidFirstImage}
            alt="Second Covid 19"
            onClick={handleImageClick}
          />
        </div>
      )}
      <TableData data={data} handleRowClick={handleRowClick} />
      {displayCharts && (
        <>
          <div
            id="chart1"
            style={{ position: "absolute", top: "50px", right: "25px" }}
          >
            <h2>Infection Rate By Day of {selectedState[0]?.state} State</h2>
            {/* <Line data={infectionRateChartData} /> */}
          </div>

          <div id="chart2" style={{ position: "absolute", top: "50px" }}>
            <h2>New Deaths By Day of {selectedState[0]?.state} State</h2>
            {/* <Line data = {newDeathsData} /> */}
          </div>
          <div id="chart3" style={{ position: "absolute", top: "900px" }}>
            <h3> Case Density of {selectedState[0]?.state} State</h3>
          </div>
          <div
            id="chart4"
            style={{ position: "absolute", top: "900px", right: "25px" }}
          >
            <h3>Vaccinations Completed Ratio of {selectedState[0]?.state} State </h3>
          </div>
        </>
      )}
    </div>
  );
}
