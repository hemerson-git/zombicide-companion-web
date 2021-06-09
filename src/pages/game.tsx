import { useEffect, useState } from "react";

import Image from "next/image";

import ProgressBar from "../components/Progress";

import styles from "../styles/game.module.scss";
import { useSurvival } from "../contexts/charSelecteds";

type SkillOptionsProps = {
  "skill-options": {
    skill: string;
  }[];
};

type Survival = {
  id: string;
  name: string;
  text: string;
  defaultSkill: string;
  levels: {
    yellow: SkillOptionsProps;
    orange: SkillOptionsProps;
    red: SkillOptionsProps;
  }[];
};

function Game() {
  const { selectedSurvivals } = useSurvival();

  const [nowPlaying, setNowPlaying] = useState({} as Survival);
  const [playerTurn, setPlayerTurn] = useState(3);

  function handleNextTurn() {
    if (playerTurn > 0) {
      setPlayerTurn(playerTurn - 1);
    }
  }

  useEffect(() => {
    if (selectedSurvivals.length > 0) {
      setNowPlaying(selectedSurvivals[0]);
      localStorage.setItem(
        "@Zombicide_selectedSurvivals",
        JSON.stringify(selectedSurvivals)
      );
    }
  }, [selectedSurvivals]);

  if (selectedSurvivals.length === 0 || !nowPlaying.id) {
    return (
      <div className={styles.gameContainer}>
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <section className={styles.gameContainer}>
      <div className={styles.nowPlayingContainer}>
        <ProgressBar survivalLevel={43} />

        <div className={styles.survivalMeta}>
          <h2>{nowPlaying?.name}</h2>
          <span>Proximo Nível em: 3 Pontos</span>
        </div>

        <div className={styles.survivalImageContainer}>
          <Image
            width={100}
            height={150}
            src={`/f${nowPlaying?.id}.webp`}
            objectFit="cover"
            objectPosition="left"
          />
        </div>

        <div>
          <select name="blue" id="blue">
            <option value="1">{nowPlaying.defaultSkill}</option>
          </select>

          <select name="yellow" id="yellow">
            {nowPlaying.levels.map((level) => {
              const { yellow } = level;

              return yellow["skill-options"].map(({ skill }, index) => (
                <option value={index} key={index}>
                  {skill}
                </option>
              ));
            })}
          </select>

          <select name="orange" id="orange">
            {nowPlaying.levels.map((level) => {
              const { orange } = level;

              return orange["skill-options"].map(({ skill }, index) => (
                <option value={index} key={index}>
                  {skill}
                </option>
              ));
            })}
          </select>

          <select name="red" id="red">
            {nowPlaying.levels.map((level) => {
              const { red } = level;

              return red["skill-options"].map(({ skill }, index) => (
                <option value={index} key={index}>
                  {skill}
                </option>
              ));
            })}
          </select>
        </div>
      </div>

      <div className={styles.otherSurvivalContainer}>
        {selectedSurvivals.map(
          (survival) =>
            survival?.id !== nowPlaying?.id && (
              <div>
                <p>{survival.name}</p>

                <Image width={90} height={60} src={`/f${survival?.id}.webp`} />
              </div>
            )
        )}
      </div>
    </section>
  );
}

export default Game;
