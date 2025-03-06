import { createContext, useState } from "react";

const CharacterContext = createContext();

export function CharacterContextProvider({ children }) {
  const [character, setCharacter] = useState("");

  return (
    <CharacterContext.Provider value={{}}>
      {" "}
      {children}{" "}
    </CharacterContext.Provider>
  );
}

export default CharacterContext;
