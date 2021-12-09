import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap'


export default function Body() {
    const [data, setData] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [displayCharts, setDisplayCharts] = useState(false)

    useEffect(() => {
        getDataFromAxios();
        getTimeSeriesData();
    }, [])

    const getDataFromAxios = async () => {
        const dataFromAxios = await axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`).then(
            result => { setData(result.data)}
        )
    }

    const getTimeSeriesData = async () => {
        const dataFromAxios = await axios.get(`https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_KEY}`).then(
            result => console.log(result)
        )
    }

    const handleRowClick = (key) => {
        const state = data.filter(obj => obj.state === key);
        setSelectedState(state)
        setDisplayCharts(true)
    }
    const giveChartData = () => {
        console.log("chart data: ", selectedState)
             
    }


    return (
        <div>
            <h2>Body . js</h2>
            <p>Here we will have main data, axios call, etc. </p>
            <p>table to display all data here</p>
            {displayCharts && <h2 style={{ position: "absolute", top: "150px" }}>Charts</h2>}
            {displayCharts && giveChartData()}

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Poplation</th>
                        <th>New Cases</th>
                        <th>New Deaths</th>
                        <th>CDC Transmission Level</th>
                        <th>Risk Levels</th>
                        <th>Test Positivity Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(obj => {
                        return (<tr id={obj.state} onClick={() => handleRowClick(obj.state)}>
                            <td>{obj.state}</td>
                            <td>{obj.population}</td>
                            <td>{obj.actuals.newCases}</td>
                            <td>{obj.actuals.newDeaths}</td>
                            <td>{obj.cdcTransmissionLevel}</td>
                            <td>{obj.riskLevels.overall}</td>
                            <td>{obj.metrics.testPositivityRatio}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>



        </div>
    )
}
