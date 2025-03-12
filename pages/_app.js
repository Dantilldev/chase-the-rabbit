import "@/styles/globals.css";
import {CharacterContextProvider} from "./context/CharatcerContext";
import {CoinContextProvider} from "./context/CoinContext";
import CoinComponent from "./components/CoinComponent";
import Footer from "./components/Footer";
import Head from "next/head";

export default function App({Component, pageProps}) {
  return (
    <CoinContextProvider>
      <CharacterContextProvider>
        <Head>
          <title>Rabbit Chase</title>
        </Head>
        <CoinComponent />
        <Component {...pageProps} />
        <Footer />
      </CharacterContextProvider>
    </CoinContextProvider>
  );
}
