import React, { createContext } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const value = {};
  return <ContextProvider value={value}>{children}</ContextProvider>;
};

export { Context, ContextProvider };
