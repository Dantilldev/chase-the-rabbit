import CoinContext from "../context/CoinContext";
import {ImCoinDollar} from "react-icons/im";
import {useContext, useEffect, useState} from "react";

export default function CoinComponent() {
  const {coins, setCoins} = useContext(CoinContext);

  useEffect(() => {
    setCoins(localStorage.getItem("coins"));
  }, []);

  return (
    <p className="top-0 absolute text-2xl text-white left-0 flex gap-2 items-center">
      {coins} <ImCoinDollar className="text-amber-300" />
    </p>
  );
}
