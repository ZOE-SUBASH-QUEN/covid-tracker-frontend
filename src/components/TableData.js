import React from "react";
import { Table } from "react-bootstrap";

const TableData = ({ data, handleRowClick }) => {
  return (
    <div
      className="tracker-table"
      style={{ width: "800px", marginTop: "250px" }}
    >
      <Table
        striped
        bordered
        hover
        responsive="sm"
        style={{ width: "800px", margin: "auto" }}
      >
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
              <tr
                key={obj.state}
                id={obj.state}
                onClick={() => handleRowClick(obj.state)}
              >
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
  );
};

export default TableData;
