import {createContext, useState, useEffect} from "react";

const CoinContext = createContext();

export function CoinContextProvider({children}) {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("coins") === null) {
      localStorage.setItem("coins", 10);
    }

    const money = Number(localStorage.getItem("coins"));

    setCoins(money);
  }, []);

  return (
    <CoinContext.Provider value={{coins, setCoins}}>
      {children}
    </CoinContext.Provider>
  );
}

export default CoinContext;
