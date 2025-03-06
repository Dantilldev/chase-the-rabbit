import "@/styles/globals.css";
import { CharacterContextProvider } from "./context/CharatcerContext";

export default function App({ Component, pageProps }) {
  return (
    <CharacterContextProvider>
      <Component {...pageProps} />;
    </CharacterContextProvider>
  );
}
