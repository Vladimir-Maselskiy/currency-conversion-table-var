import { createContext, useContext, useState } from 'react';

const RatesContext = createContext(null);

export function AppWrapper({ children }) {
  const [currentRate, setCurrentRate] = useState([]);
  let sharedState = {
    currentRate,
    setCurrentRate,
  };

  return (
    <RatesContext.Provider value={sharedState}>
      {children}
    </RatesContext.Provider>
  );
}

export function useRatesContext() {
  const context = useContext(RatesContext);
  if (!context) {
    throw new Error(
      'useRatesContext has to be used within <useRatesContext.Provider>'
    );
  }
  return context;
}
