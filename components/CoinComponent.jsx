import CoinContext from "../context/CoinContext";
import {ImCoinDollar} from "react-icons/im";
import {useContext, useEffect, useState} from "react";

export default function CoinComponent() {
  const {coins, setCoins} = useContext(CoinContext);

  useEffect(() => {
    setCoins(localStorage.getItem("coins"));
  }, []);

  return (
    <p className="top-2 absolute text-2xl text-white left-2 flex gap-2 items-center">
      {coins} <ImCoinDollar className="text-amber-300" />
    </p>
  );
}
