import React, { createContext, useState, useEffect } from "react";

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

  const value = {allLogs};
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
