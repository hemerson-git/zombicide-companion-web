import { SurvivalSelectProvider } from "../contexts/charSelecteds";
import Head from "next/head";

import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <SurvivalSelectProvider>
      <Head>
        <title>Zombicide Companion - Web</title>
      </Head>

      <main className="container">
        <Component {...pageProps} />
      </main>
    </SurvivalSelectProvider>
  );
}

export default MyApp;
