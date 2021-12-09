import React from "react";
import Line from './LineGraph'
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CovidFirstImage from "../images/covid19.image.jpeg";
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist'
export default function Body() {

    const [data, setData] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [displayCharts, setDisplayCharts] = useState(false);
    const [chartData, setChartData] = useState([])
    const [infectionRateChartData, setInfectionRateChartData] = useState({})
    const [newDeathsData, setNewDeathsData] = useState({});
    const [caseDensityData, setCaseDensityData] = useState({})
    const [vaccinationsCompletedData, setVaccinationsCompletedData] = useState({})


    var options = {
        width: 500,
        height: 400,
        axisX: {
            labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
            },
            showLabel: true,
        }
    };
    var fakelabel = ['1', '2', '3']
    useEffect(() => {
        getDataFromAxios();
        getTimeSeriesData();

    }, [])

    const getDataFromAxios = async () => {
        const dataFromAxios = await axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`).then(
            result => { setData(result.data) }
        )
    }

    const getTimeSeriesData = async () => {
        const dataFromAxios = await axios.get(`https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`).then(
            result => { setChartData(result.data) }
        )
    }

    const handleRowClick = (key) => {
        const state = data.filter(obj => obj.state === key);
        setSelectedState(state, giveChartData());

    }

    const giveChartData = () => {

        // This contains all the data for every chart
        let dataToGiveCharts = chartData.filter(obj => obj.state === selectedState[0]?.state)
        console.log(selectedState)

        //INFECTION RATE DATA (#1)
        const metricDataToGiveCharts = dataToGiveCharts[0]?.metricsTimeseries?.slice(600, -5)
        const labels = metricDataToGiveCharts?.map((obj, indx) => indx % 7 == 0 && obj.date)
        const infectionRateSeries = metricDataToGiveCharts?.map(obj => obj.infectionRate)
        setInfectionRateChartData({ labels: labels, series: [infectionRateSeries] })
        let chart = new Chartist.Line('#chart1', { labels: labels, series: [infectionRateSeries] }, options);

        //NEW DEATHS DATA (#2)
        const actualsTimeSeries = dataToGiveCharts[0]?.actualsTimeseries?.slice(600, -5);
        const newDeathsSeries = actualsTimeSeries?.map(obj => obj.newDeaths)
        setNewDeathsData({ labels: labels, series: [newDeathsSeries] })
        let chart2 = new Chartist.Line('#chart2', { labels: labels, series: [newDeathsSeries] }, options);

        //CASE DENSITY DATA (#3)
        console.log("data",metricDataToGiveCharts )
        const caseDensitySeries = metricDataToGiveCharts?.map(obj => obj.caseDensity)
        let chart3 = new Chartist.Line('#chart3', { labels: labels, series: [caseDensitySeries] }, options);
        setCaseDensityData({labels: labels, series:caseDensitySeries})
        
        //VACCINATIONS COMPLETED (#4)
        const vaccinationsCompletedSeries = metricDataToGiveCharts?.map(obj => obj.vaccinationsCompletedRatio)
        let chart4 = new Chartist.Line('#chart4', { labels: labels, series: [vaccinationsCompletedSeries] }, options);
        setVaccinationsCompletedData( { labels:labels, series:vaccinationsCompletedSeries } )
        
        setDisplayCharts(true)

    }

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
                        <div>State: {selectedState[0].state}</div>
                        <div>Population: {selectedState[0].population}</div>
                        <div>New Cases: {selectedState[0].actuals.newCases}</div>
                        <div>Risk Levels: {selectedState[0].riskLevels?.overall}</div>
                    </div>
                    <img
                        src={CovidFirstImage}
                        alt="Second Covid 19"
                        onClick={handleImageClick}
                    />
                </div>
            )}
            <div className="tracker-table" style={{width: "800px", marginTop: '250px'}}>
                <Table striped bordered hover responsive="sm" style={{ width: "800px", margin: "auto" }}>
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
            {displayCharts &&
                <>
                    <div id="chart1" style={{ position: "absolute", top: "50px", right:'25px'}}>
                        <h2>Infection Rate By Day</h2>
                        {/* <Line data={infectionRateChartData} /> */}
                    </div>

                    <div id="chart2" style={{ position: "absolute", top: "50px" }}>
                        <h2>New Deaths By Day</h2>
                        {/* <Line data = {newDeathsData} /> */}
                    </div>
                    <div id="chart3" style={{position: "absolute", top: "900px" }}>
                        <h3> Case Density </h3>

                    </div>
                    <div id="chart4" style={{position: "absolute", top: "900px", right: "25px" }}>
                        <h3>Vaccinations Completed Ratio</h3>
                    </div>
                </>

            }
        </div>
    );
}
