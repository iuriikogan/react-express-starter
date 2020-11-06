import * as React from "react";
import { useState, useContext } from "react";
import ReactMapGL from "react-map-gl";
import { Context } from "../utils/Context";

export default function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -98.4376,
    zoom: 4
  });

  const { allLogs } = useContext(Context);

  console.log(allLogs);

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/dark-v10"}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    ></ReactMapGL>
  );
}
