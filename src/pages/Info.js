import React, {useEffect, useRef} from "react";
import Header from "../components/Header";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "../data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};



const Info = () => {
  const covidData = useRef();

  useEffect(() => {
    fetch("https://api.covidtracking.com/v1/states/info.json").then(resp => resp.json()).then(json => {
      console.log(json)
      covidData.current = json;
    })
  }, [])

  const handleStateClick = ({id, val}) => {
    console.log("state clicked", id);

    const stateCovidData = covidData.current.find(stateCovidData => {
      if (stateCovidData.state === id) {
        return true;
      } else {
        return false;
      }
    });
    const covid19Site = stateCovidData.covid19Site;
    console.log(stateCovidData.covid19Site);
    window.open(covid19Site, '_blank'); // opens https://api.covidtracking.com/v1/states/info.json

  }
  return (
    
    <ComposableMap projection="geoAlbersUsa">
      
      <Geographies geography={geoUrl}>
      
        {({ geographies }) => (
          <>
          
            {geographies.map(geo => (
              
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
              />
            ))}
            
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"} onClick={(event) => handleStateClick(cur)}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default Info;
