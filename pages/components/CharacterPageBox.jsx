import {ImCoinDollar} from "react-icons/im";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useState, useContext, useEffect} from "react";
import {FaQuestion} from "react-icons/fa";

import Character1 from "./Charater1";
import Character2 from "./Character2";
import Character3 from "./Character3";
import CharacterContext from "../context/CharatcerContext";

export default function CharacterPageBox({
  name,
  cost,
  typeOfCharacter,
  onClick,
  character2,
  character3,
}) {
  const [snakeHead, setSnakeHead] = useState(0);

  const {character, setCharacter} = useContext(CharacterContext);

  return (
    <div
      onClick={() =>
        `${
          typeOfCharacter === "character-1"
            ? setCharacter("character-1")
            : typeOfCharacter === "character-2" ||
              typeOfCharacter === "character-3"
            ? onClick()
            : ""
        }`
      }
      className={`bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col justiy-center items-center place-items-center relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer`}
    >
      {typeOfCharacter === "character-1" ? (
        <Character1 snakeHead={snakeHead} />
      ) : typeOfCharacter === "character-2" ? (
        <Character2 snakeHead={snakeHead} />
      ) : typeOfCharacter === "character-3" ? (
        <Character3 snakeHead={snakeHead} />
      ) : (
        <div
          className={`w-[20px] h-[20px] text-white absolute rounded-full transition-all ease-out duration-150 top-[100px] right-[100px]`}
        >
          <FaQuestion />
        </div>
      )}

      {character === typeOfCharacter ? (
        <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
          <FaArrowRight className="animate-pulse" /> {name}
          <FaArrowLeft className="animate-pulse" />
        </p>
      ) : (
        <p className="text-white font-bold justify-center p-2 flex gap-2 items-center ">
          {name}
        </p>
      )}
      <p className="text-white font-bold absolute bottom-0 left-0 p-2 flex items-center gap-2">
        {typeOfCharacter === "character-1" ? (
          <>
            {cost} <ImCoinDollar className="text-amber-300" />
          </>
        ) : typeOfCharacter === "character-2" ? (
          <>
            {character2 === false ? (
              <>
                300 <ImCoinDollar className="text-amber-300" />
              </>
            ) : (
              <span>Unlocked</span>
            )}
          </>
        ) : typeOfCharacter === "character-3" ? (
          <>
            {character3 === false ? (
              <>
                500 <ImCoinDollar className="text-amber-300" />
              </>
            ) : (
              <span>Unlocked</span>
            )}
          </>
        ) : (
          <>
            ??? <ImCoinDollar className="text-amber-300" />
          </>
        )}
      </p>
    </div>
  );
}
