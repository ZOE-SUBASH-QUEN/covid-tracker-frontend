import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap'


export default function Body() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getDataFromAxios();
    }, [])

    const getDataFromAxios = async () => {
        const dataFromAxios = await axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=7e4ef6ff1fd14e18870ce8aeabb02154`).then(
            result => { setData(result.data); console.log(result.data) }
        )
    }


    return (
        <div>
            <h2>Body . js</h2>
            <p>Here we will have main data, axios call, etc. </p>
            <p>table to display all data here</p>

            <Table striped bordered hover>
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
                         return (<tr id={obj.state} onClick={() => console.log(obj.state)}>
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
