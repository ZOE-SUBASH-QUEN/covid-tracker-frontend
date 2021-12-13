import React, { useRef } from "react";
import Line from './LineGraph';
import Header from './Header'
import TrackButton from "./TrackButton";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from 'lodash';
import { Table, Button, Tab, Tabs, Container } from "react-bootstrap";
import CovidFirstImage from "../images/covid19.image.jpeg";
import Chartist from 'chartist'
import { useAuth0 } from '@auth0/auth0-react';
import TrackedLocationsAccordion from "./TrackedLocationsAccordion";

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
    //state!
    const [data, setData] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [displayCharts, setDisplayCharts] = useState(false);
    const [chartData, setChartData] = useState([])
    const [infectionRateChartData, setInfectionRateChartData] = useState({})
    const [newDeathsData, setNewDeathsData] = useState({});
    const [caseDensityData, setCaseDensityData] = useState({})
    const [vaccinationsCompletedData, setVaccinationsCompletedData] = useState({})
    const [usersFavorites, setUsersFavorites] = useState([]);
    const prevSelectedState = usePrevious(selectedState);
    const [sortNewCases, setSortNewCases] = useState('asc');
    const [sortNewDeaths, setSortNewDeaths] = useState('asc');
    const [sortTransLevel, setSortTransLevel] = useState('asc');
    const [sortRiskLevel, setSortRiskLevel] = useState('asc');

    //AUTH0 Hooks
    const { user, isAuthenticated, isLoading } = useAuth0();

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
  
     const isChanged = !_.isEqual(prevSelectedState, selectedState);
  
    useEffect(() => {
        getDataFromAxios();
        getTimeSeriesData();
        // getUsersFavorites();
    }, []);

    useEffect(() => {
        if (selectedState && selectedState[0]) {
          giveChartData();
        }
    }, [isChanged]);

    const getDataFromAxios = async () => {
        const dataFromAxios = await axios
        .get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`).then(
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
        setSelectedState(state);
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
        console.log("data", metricDataToGiveCharts)
        const caseDensitySeries = metricDataToGiveCharts?.map(obj => obj.caseDensity)
        let chart3 = new Chartist.Line('#chart3', { labels: labels, series: [caseDensitySeries] }, options);
        setCaseDensityData({ labels: labels, series: caseDensitySeries })

        //VACCINATIONS COMPLETED (#4)
        const vaccinationsCompletedSeries = metricDataToGiveCharts?.map(obj => obj.vaccinationsCompletedRatio)
        let chart4 = new Chartist.Line('#chart4', { labels: labels, series: [vaccinationsCompletedSeries] }, options);
        setVaccinationsCompletedData({ labels: labels, series: vaccinationsCompletedSeries })
        setDisplayCharts(true)

    }

    const handleSetUsersFavorites = (data) => {
        console.log(data.tracking)
        let unique = data.tracking.filter(onlyUnique) //remove duplicates from errors in database
        console.log(unique)
        setUsersFavorites(unique)
    }

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
      }
    const checkIfTracked = (state) => {
        let result = true
        usersFavorites.map(obj => {
            if (obj == state){
                result = false
            }
        })
        return result 
    }

    const handleSort = (column) => {
        let sortOrder = 'asc';
        switch(column) {
            case 'newCases':
                 sortOrder = sortNewCases === 'asc' ? 'desc' : 'asc';
                setSortNewCases(sortOrder);
               setData( _.orderBy(data, 'actuals.newCases', sortOrder));
                break;
            case 'newDeaths':
                sortOrder = sortNewDeaths === 'asc' ? 'desc' : 'asc';
                setSortNewDeaths(sortOrder);
                setData(_.orderBy(data, 'actuals.newDeaths', sortOrder));
                break;
            case 'transLevel':
                sortOrder = sortTransLevel === 'asc' ? 'desc' : 'asc';
                setSortTransLevel(sortOrder);
                setData(_.orderBy(data, 'cdcTransmissionLevel', sortOrder));
                    break;
            case 'riskLevel':
                sortOrder = sortRiskLevel === 'asc' ? 'desc' : 'asc';
                setSortRiskLevel(sortOrder);
                setData(_.orderBy(data, 'riskLevels.overall', sortOrder));
                break;
            default:
                break;
        }
    }


    return (
        <>
            <Header handleSetUsersFavorites={handleSetUsersFavorites} />
            <div>
                {displayCharts && (
                    <div className="image-nav">
                        <img
                            src={CovidFirstImage}
                            alt="First Covid 19"
                        />
                        <div>
                            <div className= "top-info">State: {selectedState[0].state}</div>
                            <div>Population: {selectedState[0].population}</div>
                            <div>New Cases: {selectedState[0].actuals.newCases}</div>
                            <div>Risk Levels: {selectedState[0].riskLevels?.overall}</div>
                        </div>
                        <img
                            src={CovidFirstImage}
                            alt="Second Covid 19"
                        />
                    </div>
                )}
                <div className="main-content">
                 <div>
                    {displayCharts &&
                                <>
                                    <div id="chart1" className="chart-graph" >
                                        <h2>Infection Rate By Day</h2>
                                        {/* <Line data={infectionRateChartData} /> */}
                                    </div>

                                    <div className="image-nav-single">
                                        <img src={CovidFirstImage} alt="First Covid 19"/>
                                    </div>

                                    <div id="chart2" className="chart-graph">
                                        <h2>New Deaths By Day</h2>
                                        {/* <Line data = {newDeathsData} /> */}
                                    </div>

                                    <div className="image-nav-single">
                                        <img src={CovidFirstImage} alt="First Covid 19"/>
                                    </div>

                                    <div id="chart3" className="chart-graph">
                                        <h3> Case Density </h3>

                                    </div>

                                    <div className="image-nav-single">
                                        <img src={CovidFirstImage} alt="First Covid 19"/>
                                    </div>

                                    
                                    <div id="chart4" className="chart-graph">
                                        <h3>Vaccinations Completed Ratio</h3>
                                    </div>
                                </>

                            }
                    </div>
                <Container style={{width:"700px"}} className="top-info">
                    <Tabs defaultActiveKey="USA">
                        <Tab eventKey="USA" title="USA">
                            <div className="tracker-table" style={{ width: "800px", marginTop: '100px' }}>
                                <Table striped bordered hover responsive="sm" style={{ width: "800px", margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th className="table-heading">State</th>
                                            <th className="table-heading">Population</th>
                                            <th onClick={() => handleSort('newCases')} className="table-heading">New Cases</th>
                                            <th onClick={() => handleSort('newDeaths')} className="table-heading">New Deaths</th>
                                            <th onClick={() => handleSort('transLevel')} className="table-heading">CDC Transmission Level</th>
                                            <th onClick={() => handleSort('riskLevel')} className="table-heading">Risk Levels</th>
                                            <th className="table-heading">Test Positivity Ratio</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((obj, indx) => {
                                            return (
                                                <tr id={obj.state} key={obj.state}>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.state}</td>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.population}</td>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.actuals.newCases}</td>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.actuals.newDeaths}</td>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.cdcTransmissionLevel}</td>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.riskLevels.overall}</td>
                                                    <td onClick={() => handleRowClick(obj.state)}>{obj.metrics.testPositivityRatio}</td>
                                                    {isAuthenticated && <td key={indx}>
                                                        <TrackButton 
                                                        obj={obj} 
                                                        tracked={checkIfTracked(obj.state)}
                                                        usersFavorites={usersFavorites}
                                                        handleSetUsersFavorites={handleSetUsersFavorites}/>
                                                        </td>}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                            </Tab>
                            <Tab eventKey="world" title="World">
                                World Data
                            </Tab>
                            <Tab eventKey="tracked" title="My Tracked Locations">
                                <TrackedLocationsAccordion usersFavorites = {usersFavorites} setUsersFavorites={setUsersFavorites}/>
                            </Tab>
                    </Tabs>
                    </Container>
                   
                    </div>
                            { /* displayCharts && (
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
                            ) */}
                           
            </div>
        </>
    );

}
