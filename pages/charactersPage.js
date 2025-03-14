import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { ImCoinDollar } from "react-icons/im";
import { FaQuestion } from "react-icons/fa";
import CharacterContext from "./context/CharatcerContext";
import CoinContext from "./context/CoinContext";
import Button from "./components/Button";
import Character1 from "./components/Charater1";
import Character2 from "./components/Character2";
import Character3 from "./components/Character3";
import CharacterPageBox from "./components/CharacterPageBox";

import { useState, useContext, useEffect } from "react";

// Todo 😎
// Sätta tre nya localstorage en för varje karaktär, när man klickar på en karaktär och unlock == true så ska karaktären bytas till den karaktären

export default function CharactersPage() {
  const [snakeHead, setSnakeHead] = useState(0);
  const { coins, setCoins } = useContext(CoinContext);
  const { character, setCharacter } = useContext(CharacterContext);
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
        <CharacterPageBox
          cost="Free"
          typeOfCharacter="character-1"
          name="Rabbit"
        />

        <CharacterPageBox
          cost="300"
          typeOfCharacter="character-2"
          name="Rabbit Slayer"
          onClick={changeCharacter2}
          character2={character2}
        />

        <CharacterPageBox
          cost="300"
          typeOfCharacter="character-3"
          name="Rabbit Destroyer"
          onClick={changeCharacter3}
          character3={character3}
        />
        <CharacterPageBox name="???..." />
        <CharacterPageBox name="???..." />
        <CharacterPageBox name="???..." />
      </div>
    </div>
  );
}
