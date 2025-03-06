import Link from "next/link";

import { useState, useContext } from "react";

export default function Home() {
  return (
    <div
      className="lex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-imageV2.jpg')" }}
    >
      {/* <Game /> */}

      <Link href="/game">
        <button className="bg-blue-500 p-2 text-white font-bold rounded-2xl">
          {" "}
          play Game
        </button>
      </Link>
    </div>
  );
}
