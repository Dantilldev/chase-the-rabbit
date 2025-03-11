import { FaArrowDown } from "react-icons/fa";
import { ImCoinDollar } from "react-icons/im";

import Button from "./components/Button";
import Character1 from "./components/Charater1";
import Character2 from "./components/Character2";
import Character3 from "./components/Character3";

import { FaQuestion } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function CharactersPage() {
  const [snakeHead, setSnakeHead] = useState({ x: 0, y: 0 });
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 ">
        <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <Character1 snakeHead={snakeHead} />
          <p className="text-white font-bold absolute bottom-0 left-0 p-2">
            Drake Slayer
          </p>

          <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex items-center gap-2">
            Free <ImCoinDollar className="text-amber-300" />
          </p>
        </div>

        <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <Character2 snakeHead={snakeHead} />
          <p className="text-white font-bold absolute bottom-0 left-0 p-2">
            Rabbit Slayer
          </p>

          <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex items-center gap-2">
            300 <ImCoinDollar className="text-amber-300" />
          </p>
        </div>

        <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <Character3 snakeHead={snakeHead} />
          <p className="text-white font-bold absolute bottom-0 left-0 p-2">
            Rabbit destroyer
          </p>

          <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex items-center gap-2">
            550 <ImCoinDollar className="text-amber-300" />
          </p>
        </div>
        <div className="bg-slate-900 w-56 h-56 rounded-4xl p-2 shadow-2xl flex flex-col relative hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <div
            className={`w-[20px] h-[20px] text-white absolute rounded-full transition-all ease-out duration-150 top-[100px] right-[100px]`}
          >
            <FaQuestion />
          </div>

          <p className="text-white font-bold absolute bottom-0 left-0 p-2">
            ???...
          </p>
          <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex gap-2 items-center">
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

          <p className="text-white font-bold absolute bottom-0 left-0 p-2">
            ???...
          </p>
          <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex gap-2 items-center">
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

          <p className="text-white font-bold absolute bottom-0 left-0 p-2">
            ???...
          </p>
          <p className="text-white font-bold absolute bottom-0 right-0 p-2 flex gap-2 items-center">
            ???
            <ImCoinDollar className="text-amber-300" />
          </p>
        </div>
      </div>
    </div>
  );
}
