import { MouseEvent, useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { useSurvival } from "../contexts/charSelecteds";
import gameFlow from "../util/gameFlow";
import NewgameAlert from "../components/NewgameAlert";

export default function Home() {
  const { pushSelectedSurvivals, pushGameFlow, loadGame } = useSurvival();
  const [canContinue, setCanContinue] = useState(false);
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const survivals = localStorage.getItem("@Zombicide_selectedSurvivals");
    const gameLevel = localStorage.getItem("@Zombicide_gameLevel");

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

  function handleLoadGame(event: MouseEvent) {
    event.preventDefault();
    loadGame();
    router.push("/game");
  }

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Zombiecide | Select Survivals</title>
      </Head>

      <section className={styles.popupContainer}>
        <h1>Main Menu</h1>

        <button type="button" disabled={!canContinue} onClick={handleLoadGame}>
          Continuar
        </button>

        <button onClick={handleNewGame} className={styles.btnGameStart}>
          Iniciar Jogo
        </button>
      </section>

      <NewgameAlert visible={visible} setVisible={setVisible} />
    </div>
  );
}
