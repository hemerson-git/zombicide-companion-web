import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import styles from "./styles.module.scss";

export default function Home() {
  const [gameID, setGameId] = useState<string | null>(null);

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Zombiecide | Select Survivals</title>
      </Head>

      <section className={styles.popupContainer}>
        <h1>Main Menu</h1>

        <button type="button" disabled>
          Continuar
        </button>

        <Link href="/survivals">
          <a className={styles.btnGameStart}>Iniciar Jogo</a>
        </Link>
      </section>
    </div>
  );
}
