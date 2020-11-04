import * as React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";

export default function Map() {
  const [viewport, setViewport] = useState({
    width: 1200,
    height: 1200,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}
