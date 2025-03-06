import React from "react";
import Game from "./game";
import { CharacterContextProvider } from "./context/CharatcerContext";

export default function Home() {
  return (
    <CharacterContextProvider>
      <div>
        <Game />
      </div>
    </CharacterContextProvider>
  );
}
