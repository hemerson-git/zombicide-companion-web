import { useState } from "react";

import Image from "next/image";

import ProgressBar from "../components/Progress";

import styles from "../styles/game.module.scss";

type SurvivalsProps = {
  name: string;
  id: string;
};

type SelectedSurvivalProps = {
  name: string;
  id: string;
};

function Game() {
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [selectedSurvival, setSelectedSurvival] =
    useState<SelectedSurvivalProps | null>(null);

  return (
    <section className={styles.gameContainer}>
      <div className={styles.nowPlayingContainer}>
        <ProgressBar survivalLevel={43} />

        <div className={styles.survivalMeta}>
          <h2>Wanda</h2>
          <span>Proximo Nível em: 3 Pontos</span>
        </div>

        <div className={styles.survivalImageContainer}>
          <Image
            width={100}
            height={150}
            src={`/f${"wanda"}.webp`}
            objectFit="cover"
            objectPosition="left"
          />
        </div>
      </div>
    </section>
  );
}

export default Game;
