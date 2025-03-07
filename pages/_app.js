import "@/styles/globals.css";
import { CharacterContextProvider } from "./context/CharatcerContext";
import { CoinContextProvider } from "./context/CoinContext";
import CoinComponent from "./components/CoinComponent";
import Footer from "./components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <CoinContextProvider>
      <CharacterContextProvider>
        <CoinComponent />
        <Component {...pageProps} />
        <Footer />
      </CharacterContextProvider>
    </CoinContextProvider>
  );
}
