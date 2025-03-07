import { createContext, useState, useEffect, use } from "react";

const CoinContext = createContext();

export function CoinContextProvider({ children }) {
  const [coins, setCoins] = useState(0);
  useEffect(() => {
    localStorage.setItem("coins", 0);
    setCoins(localStorage.getItem("coins"));
  }, []);

  return (
    <CoinContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinContext.Provider>
  );
}

export default CoinContext;
