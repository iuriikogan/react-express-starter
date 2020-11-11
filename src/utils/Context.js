import React, { createContext, useState, useEffect } from "react";
import { listAllLogs } from "./Api";

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

  // ------------------------------------------------ fetch all log entries

  const getEntries = async () => {
    const logs = await listAllLogs();
    setAllLogs(logs);
  };

  useEffect(() => {
    getEntries();
  }, []);

  // -------------------------------------------------- pass values to contextProvider

  const value = { allLogs, getEntries, viewport, setViewport };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
