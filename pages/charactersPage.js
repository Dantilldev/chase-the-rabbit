import {FaArrowDown} from "react-icons/fa";
import {FaArrowRight, FaArrowLeft} from "react-icons/fa";

import {ImCoinDollar} from "react-icons/im";
import {FaQuestion} from "react-icons/fa";
import CharacterContext from "./context/CharatcerContext";
import CoinContext from "./context/CoinContext";
import Button from "./components/Button";
import Character1 from "./components/Charater1";
import Character2 from "./components/Character2";
import Character3 from "./components/Character3";

import {useState, useContext, useEffect} from "react";

// Todo 😎
// Sätta tre nya localstorage en för varje karaktär, när man klickar på en karaktär och unlock == true så ska karaktären bytas till den karaktären

export default function CharactersPage() {
  const [snakeHead, setSnakeHead] = useState(0);
  const {coins, setCoins} = useContext(CoinContext);
  const {character, setCharacter} = useContext(CharacterContext);
  const [character2, setCharacter2] = useState(null);
  const [character3, setCharacter3] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem("character-2") === null ||
      localStorage.getItem("character-3") === null
    ) {
      localStorage.setItem("character-2", JSON.stringify(false));
      localStorage.setItem("character-3", JSON.stringify(false));
    }
    setCharacter2(JSON.parse(localStorage.getItem("character-2")));
    setCharacter3(JSON.parse(localStorage.getItem("character-3")));
  }, []);

  // funktion där man kan köpa karaktär baserat på om den e upplåst eller inte.

  function changeCharacter2() {
    let unlocked2 = JSON.parse(localStorage.getItem("character-2"));

    if (unlocked2 === false) {
      if (coins > 300) {
        localStorage.setItem("character-2", JSON.stringify(true));
        setCoins((prev) => prev - 300);
        localStorage.setItem(
          "coins",
          Number(localStorage.getItem("coins") - 300)
        );
      } else {
        alert("You dont have enough coins!");
      }
    } else {
      setCharacter("character-2");
    }
  }

  function changeCharacter3() {
    let unlocked3 = JSON.parse(localStorage.getItem("character-3"));

    if (unlocked3 === false) {
      if (coins > 550) {
        localStorage.setItem("character-3", JSON.stringify(true));
        setCoins((prev) => prev - 550);
        localStorage.setItem(
          "coins",
          Number(localStorage.getItem("coins") - 550)
        );
      } else {
        alert("You dont have enough coins!");
      }
    } else {
      setCharacter("character-3");
    }
  }

  return (
    <div className="bg-slate-800 w-full items-center justify-center flex flex-col p-2 min-h-screen">
      <div className="absolute top-10 left-0 p-2">
        <Button href="/" text="Back" />
      </div>

      <h1 className="text-4xl text-white font-bold text-center mb-10 flex gap-6 animate-bounce transition-all duration-300">
        <FaArrowDown />
        Characters
        <FaArrowDown />
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        <div
          onClick={() => setCharacter("character-1")}
          className={`bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer`}
        >
          <Character1 snakeHead={snakeHead} />

          {character === "character-1" ? (
            <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
              <FaArrowRight className="animate-pulse" /> Drake Slayer
              <FaArrowLeft className="animate-pulse" />
            </p>
          ) : (
            <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
              Drake Slayer
            </p>
          )}

          <p className="text-white font-bold absolute bottom-0 left-0 p-2 flex items-center gap-2">
            Free <ImCoinDollar className="text-amber-300" />
          </p>
        </div>

        <div
          onClick={() => changeCharacter2()}
          className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <Character2 snakeHead={snakeHead} />
          {character === "character-2" ? (
            <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
              <FaArrowRight className="animate-pulse" /> Rabbit slayer
              <FaArrowLeft className="animate-pulse" />
            </p>
          ) : (
            <p className="text-white font-bold justify-center p-2 flex gap-2 items-center">
              {" "}
              Rabbit Slayer
            </p>
          )}

          <p className="text-white font-bold absolute bottom-0 flex items-center gap-2">
            {character2 === false ? (
              <>
                {" "}
                300 <ImCoinDollar className="text-amber-300" />{" "}
              </>
            ) : (
              <span> Unlocked </span>
            )}
          </p>
        </div>

        <div
          onClick={() => changeCharacter3()}
          className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <Character3 snakeHead={snakeHead} />
          {character === "character-3" ? (
            <p className="text-white font-bold justify-center p-2 flex gap-2 items-center">
              <FaArrowRight className="animate-pulse" /> Rabbit destroyer
              <FaArrowLeft className="animate-pulse" />
            </p>
          ) : (
            <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
              {" "}
              Rabbit destroyer{" "}
            </p>
          )}

          <p className="text-white font-bold absolute bottom-0 left-0 p-2 flex items-center gap-2">
            {character3 === false ? (
              <>
                550 <ImCoinDollar className="text-amber-300" />{" "}
              </>
            ) : (
              <span> Unlocked </span>
            )}
          </p>
        </div>
        <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <div
            className={`w-[20px] h-[20px] text-white absolute rounded-full transition-all ease-out duration-150 top-[100px] right-[100px]`}
          >
            <FaQuestion />
          </div>

          <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
            ???...
          </p>
          <p className="text-white font-bold absolute bottom-0 left-0 p-2 flex gap-2 items-center">
            ???
            <ImCoinDollar className="text-amber-300" />
          </p>
        </div>
        <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <div
            className={`w-[20px] h-[20px] text-white absolute rounded-full transition-all ease-out duration-150 top-[100px] right-[100px]`}
          >
            <FaQuestion />
          </div>

          <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
            ???...
          </p>
          <p className="text-white font-bold absolute bottom-0 lefts-0 p-2 flex gap-2 items-center">
            ???
            <ImCoinDollar className="text-amber-300" />
          </p>
        </div>
        <div className="bg-slate-900 w-56 h-56 rounded-4xl shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <div
            className={`w-[20px] h-[20px] text-white absolute rounded-full transition-all ease-out duration-150 top-[100px] right-[100px]`}
          >
            <FaQuestion />
          </div>

          <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
            ???...
          </p>
          <p className="text-white font-bold absolute bottom-0 lefts-0 p-2 flex gap-2 items-center">
            ???
            <ImCoinDollar className="text-amber-300" />
          </p>
        </div>
      </div>
    </div>
  );
}
