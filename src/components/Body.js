import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CovidFirstImage from "../images/covid19.image.jpeg";

export default function Body() {
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [displayCharts, setDisplayCharts] = useState(false);

  useEffect(() => {
    getDataFromAxios();
  }, []);

  const getDataFromAxios = async () => {
    const dataFromAxios = await axios
      .get(
        `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`
      )
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      });
  };

  const handleRowClick = (key) => {
    const state = data.filter((obj) => obj.state === key);
    console.log({ state });
    setSelectedState(state[0]);
    setDisplayCharts(true);
  };
  const giveChartData = () => {
    console.log("chart data: ", selectedState);
  };

  const handleImageClick = () => {
    alert("image clicked");
  };

  return (
    <div>
      <h2>Body . js</h2>
      <p>Here we will have main data, axios call, etc. </p>
      <p>table to display all data here</p>
      {displayCharts && (
        <h2 style={{ position: "absolute", top: "150px" }}>Charts</h2>
      )}
      {displayCharts && giveChartData()}
      {displayCharts && (
        <div className="image-nav">
          <img
            src={CovidFirstImage}
            alt="First Covid 19"
            onClick={handleImageClick}
          />
          <div>
            <div>State: {selectedState.state}</div>
            <div>Population: {selectedState.population}</div>
            <div>New Cases: {selectedState.actuals?.newCases}</div>
            <div>Risk Levels: {selectedState.riskLevels?.overall}</div>
          </div>
          <img
            src={CovidFirstImage}
            alt="Second Covid 19"
            onClick={handleImageClick}
          />
        </div>
      )}
      <div className="tracker-table">
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>State</th>
              <th>Population</th>
              <th>New Cases</th>
              <th>New Deaths</th>
              <th>CDC Transmission Level</th>
              <th>Risk Levels</th>
              <th>Test Positivity Ratio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((obj) => {
              return (
                <tr id={obj.state} onClick={() => handleRowClick(obj.state)}>
                  <td>{obj.state}</td>
                  <td>{obj.population}</td>
                  <td>{obj.actuals.newCases}</td>
                  <td>{obj.actuals.newDeaths}</td>
                  <td>{obj.cdcTransmissionLevel}</td>
                  <td>{obj.riskLevels.overall}</td>
                  <td>{obj.metrics.testPositivityRatio}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
    </div>
  );
}
