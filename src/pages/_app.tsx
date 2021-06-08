import { SurvivalSelectProvider } from "../contexts/charSelecteds";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <SurvivalSelectProvider>
      <main className="container">
        <Component {...pageProps} />
      </main>
    </SurvivalSelectProvider>
  );
}

export default MyApp;
