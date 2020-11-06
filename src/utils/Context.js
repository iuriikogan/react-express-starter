import React, { useState, useEffect, createContext } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
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

  return <ContextProvider value={allLogs}>{children}</ContextProvider>;
};

export { Context, ContextProvider };
