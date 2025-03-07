import Link from "next/link";
import Footer from "./components/Footer";
import Button from "./components/Button";
import HowToPlay from "./components/HowToPlay";

import { useState, useContext, useEffect } from "react";

export default function Home() {
  const [showCharacters, setShowCharacters] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 overflow-hidden font-sans">
      {" "}
      <div className="relative h-24 w-96 mb-10">
        <div className="absolute w-20 h-20 bg-red-500 left-24 top-2 animate-box"></div>
        <div className=" right-24 top-4 animate-rabbit after:content-[''] text-7xl z-20">
          {" "}
          🐇
        </div>{" "}
      </div>
      <h1
        className="text-5xl font-bold text-gray-100 mb-8 shadow-lg"
        style={{ textShadow: "3px 3px 0px #16a085" }}
      >
        Rabbit Chase
      </h1>
      <div className="flex flex-wrap justify-center gap-5">
        <Button href="/game" text="PLAY" />

        <Button
          href="#"
          text="HOW TO PLAY"
          onClick={() => setIsHowToPlayOpen(true)}
        />
        <Button href="/charactersPage" text="CHARACTERS" />
        <div className="fixed jusify-center item-center">
          {isHowToPlayOpen && (
            <HowToPlay onClose={() => setIsHowToPlayOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
