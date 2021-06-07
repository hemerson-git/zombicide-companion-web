import { useState } from "react";

import ProgressBar from "../components/Progress";

import styles from "../styles/game.module.scss";

function Game() {
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  return (
    <section className={styles.gameContainer}>
      <div className={styles.nowPlayingContainer}>
        <h2>Wanda</h2>

        <div className={styles.survivalMeta}>
          <ProgressBar survivalLevel={43} />
          <span>Proximo Nível em: </span>
        </div>
      </div>
    </section>
  );
}

export default Game;
