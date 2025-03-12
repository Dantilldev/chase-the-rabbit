import {createContext, useState} from "react";

const CharacterContext = createContext();

export function CharacterContextProvider({children}) {
  const [character, setCharacter] = useState("character-1");

  return (
    <CharacterContext.Provider value={{character, setCharacter}}>
      {children}
    </CharacterContext.Provider>
  );
}

export default CharacterContext;
