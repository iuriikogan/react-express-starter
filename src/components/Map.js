import * as React from "react";
import { useState, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Context } from "../utils/Context";

export default function Map() {
  // ----------------------------------------- set viewport state for map
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -98.4376,
    zoom: 3
  });

  // ------------------------------------------ initialize state variables

  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  // -------------------------------------------- deconstruct allLogs from Context

  const { allLogs } = useContext(Context);

  // ------------------------------------- Show Add Marker Card on Double Click map

  const showAddMarkerPopup = e => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      longitude,
      latitude
    });
  };

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/dark-v10"}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      doubleClickZoom={false}
      onDblClick={showAddMarkerPopup}
    >
      {/* map over all logs and render a marker and popup to each   */}

      {allLogs.map(log => {
        return (
          <>
            <Marker
              latitude={log.Latitude}
              longitude={log.Longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div
                className="marker"
                onClick={() =>
                  setShowPopup({
                    [log._id]: true
                  })
                }
              >
                <p>📍 {log.Title}</p>
              </div>
            </Marker>

            {/* show popup if true for the log_id */}

            {showPopup[log._id] ? (
              <Popup
                latitude={log.Latitude}
                longitude={log.Longitude}
                closeButton={true}
                closeOnClick={true}
                dynamicPosition={true}
                onClose={() =>
                  setShowPopup({
                    [log._id]: false
                  })
                }
                anchor="top"
              >
                <div className="marker-popup">
                  <h3>{log.Title}</h3>
                  <p>{log.Description}</p>
                  <p>{log.Comments}</p>
                  <img src={log.Image} alt={log.Title} />
                  <p>
                    visited on: {new Date(log.visitDate).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            ) : null}
          </>
        );
      })}

      {/* if AddEntryLocation exists show addEntry popup */}

      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          ></Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => {
              setAddEntryLocation(null);
            }}
            anchor="top"
          >
            <div>
              <p> Enter your entry details</p>
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}
