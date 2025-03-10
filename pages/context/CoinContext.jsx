import {createContext, useState} from "react";

const CoinContext = createContext();

export function CoinContextProvider({children}) {
  const [coins, setCoins] = useState(0);

  return (
    <CoinContext.Provider value={{coins, setCoins}}>
      {children}
    </CoinContext.Provider>
  );
}

export default CoinContext;
