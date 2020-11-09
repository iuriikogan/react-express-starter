import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  // ----------------------------------------- set viewport state for map
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -98.4376,
    zoom: 3
  });

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

  const value = { allLogs, viewport, setViewport };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
