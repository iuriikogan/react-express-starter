import * as React from "react";
import { useState, useContext } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Context } from "../utils/Context";
import AddEntryForm from "./AddEntryForm";
import Sidebar from "./Sidebar";

export default function Map() {
  // ------------------------------------------ initialize state variables

  const [showPopup, setShowPopup] = useState({});

  const [addEntryLocation, setAddEntryLocation] = useState(null);

  // -------------------------------------------- deconstruct allLogs from Context

  const { allLogs, getEntries, viewport, setViewport } = useContext(Context);

  // ------------------------------------- Show Add Marker Card on Double Click map

  const showAddEntryPopup = e => {
    const [Longitude, Latitude] = e.lngLat;
    setAddEntryLocation({
      Longitude,
      Latitude
    });
  };

  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/dark-v10"}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      doubleClickZoom={false}
      onDblClick={showAddEntryPopup}
    >
      <Sidebar />
      {/* map over all logs and render a marker and popup to each   */}
      {allLogs.map(log => {
        return (
          <>
            <Marker
              key={log._id}
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
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.Latitude}
            longitude={addEntryLocation.Longitude}
            offsetLeft={-10}
            offsetTop={-10}
          ></Marker>
          <Popup
            latitude={addEntryLocation.Latitude}
            longitude={addEntryLocation.Longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setAddEntryLocation(null);
            }}
            dynamicPosition={true}
            anchor="top"
          >
            <AddEntryForm
              location={addEntryLocation}
              onClose={() => {
                setAddEntryLocation(null);
                getEntries();
              }}
            />
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}
