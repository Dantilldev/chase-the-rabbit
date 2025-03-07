import Link from "next/link";
import CharacterMenu from "./components/characterMenu"; // Import the CharacterMenu component

import { useState, useContext } from "react";

export default function Home() {
  const [showCharacters, setShowCharacters] = useState(false);

  return (
    <div
      className="lex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center "
      style={{ backgroundImage: "url('/bg-imageV2.jpg')" }}
    >
      {/* <Game /> */}
      <div className="h-[600px] w-full flex flex-col justify-center items-center">
        <div className="flex gap-4">
          <Link href="/game">
            <button className="bg-blue-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-105 duration-150 ease-in transition-all w-32">
              {" "}
              play Game
            </button>
          </Link>
          <button
            onClick={() => setShowCharacters(!showCharacters)}
            className="bg-orange-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-105 duration-150 ease-in transition-all w-32"
          >
            {" "}
            Charaters{" "}
          </button>
        </div>
        {showCharacters && <CharacterMenu />}
      </div>
    </div>
  );
}
