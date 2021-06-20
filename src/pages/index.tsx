import { MouseEvent, useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { useSurvival } from "../contexts/charSelecteds";
import gameFlow from "../util/gameFlow";
import NewgameAlert from "../components/NewgameAlert";

export default function Home() {
  const { pushSelectedSurvivals, pushGameFlow } = useSurvival();
  const [canContinue, setCanContinue] = useState(false);
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const survivals = localStorage.getItem("@Zombicide_selectedSurvivals");

    if (survivals) {
      setCanContinue(true);
      pushSelectedSurvivals(JSON.parse(survivals));
      const parsedFlow = gameFlow(JSON.parse(survivals));
      pushGameFlow(parsedFlow);
    }
  }, []);

  function handleNewGame(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!canContinue) {
      router.push("/survivals");
      return;
    }

    setVisible(true);
  }

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

        <button onClick={handleNewGame} className={styles.btnGameStart}>
          Iniciar Jogo
        </button>
      </section>

      <NewgameAlert visible={visible} setVisible={setVisible} />
    </div>
  );
}
