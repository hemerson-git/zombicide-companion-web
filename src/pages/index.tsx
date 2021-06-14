import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import styles from "./styles.module.scss";
import { useSurvival } from "../contexts/charSelecteds";
import gameFlow from "../util/gameFlow";

export default function Home() {
  const [canContinue, setCanContinue] = useState(false);
  const { pushSelectedSurvivals, pushGameFlow } = useSurvival();

  useEffect(() => {
    const survivals = localStorage.getItem("@Zombicide_selectedSurvivals");

    if (survivals) {
      setCanContinue(true);
      pushSelectedSurvivals(JSON.parse(survivals));
      const parsedFlow = gameFlow(JSON.parse(survivals));
      pushGameFlow(parsedFlow);
    }
  }, []);

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Zombiecide | Select Survivals</title>
      </Head>

      <section className={styles.popupContainer}>
        <h1>Main Menu</h1>

        <Link href="/game">
          <button type="button" disabled={!canContinue}>
            Continuar
          </button>
        </Link>

        <Link href="/survivals">
          <a className={styles.btnGameStart}>Iniciar Jogo</a>
        </Link>
      </section>
    </div>
  );
}
