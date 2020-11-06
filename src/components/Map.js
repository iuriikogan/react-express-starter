import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
// import { Context } from "../utils/Context";

export default function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -98.4376,
    zoom: 3
  });

  // const { allLogs } = useContext(Context);
  const [allLogs, setAllLogs] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/api/logs";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAllLogs(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/dark-v10"}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {allLogs.map(log => {
        return (
          <Marker
            latitude={log.Latitude}
            longitude={log.Longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div className="marker">
              <h3>📍 {log.Title}</h3>
            </div>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
