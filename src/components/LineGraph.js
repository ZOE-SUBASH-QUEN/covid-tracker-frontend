import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import './reactChartlist.css'

export default function Line({ data }) {

  const [graphdata, setgraphData] = useState(null)
  const [max, setMax] = useState(0)
  data.labels = ['1', '2', '3']

  useEffect(() => {
    console.log("DATA INSIDE LINE GRAPH", data)
    setgraphData(data)
    if (data.series[0] != undefined) {
      setMax(Math.max(...data.series[0]))

    }

  }, [data])

  var theirdata = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [
      [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    ]
  };

  var options = {
    high: max,
    low: 0,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 2 === 0 ? value : null;
      },
      showLabel: true,
    }
  };

  var type = 'Line'

  return (
    <>
      <h2> Infection Rate By Day</h2>
      <ChartistGraph data={graphdata ? graphdata : theirdata} options={options} type={type} />
    </>
  )
}


