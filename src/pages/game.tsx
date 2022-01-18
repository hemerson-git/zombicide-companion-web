import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft, FiPlus, FiMinus } from "react-icons/fi";

import Image from "next/image";

import ProgressBar from "../components/Progress";

import styles from "../styles/game.module.scss";
import { useSurvival } from "../contexts/charSelecteds";
import gameFlow from "../util/gameFlow";

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
  userLevel: number;
  xp: number;
  levels: {
    yellow: SkillOptionsProps;
    orange: SkillOptionsProps;
    red: SkillOptionsProps;
  }[];
};

function Game() {
  const {
    selectedSurvivals,
    handleSetNowPlaying,
    nowPlaying,
    handleSetSurvivalXP,
    nextWave,
    prevWave,
    startGame,
    wave,
  } = useSurvival();
  const [playerTurn, setPlayerTurn] = useState(3);

  useEffect(() => {
    console.log(nowPlaying);
    if (!nowPlaying?.id) {
      const parseSurvivals = gameFlow(selectedSurvivals);
      startGame(parseSurvivals);
      return;
    }
  }, [nowPlaying]);

  if (selectedSurvivals.length === 0 || !nowPlaying?.id) {
    return (
      <div className={styles.gameContainer}>
        <h2>Loading</h2>
      </div>
    );
  }

  function handleNextGameTurn(survival: Survival) {
    handleSetNowPlaying(survival);
  }

  function handleNextSurvivalTurn() {
    if (playerTurn > 0) {
      setPlayerTurn(playerTurn - 1);
      return;
    }
  }

  function increaseSurvivalXP() {
    handleSetSurvivalXP(nowPlaying, "plus");
  }

  function decreaseSurvivalXP() {
    handleSetSurvivalXP(nowPlaying, "minus");
  }

  return (
    <section className={styles.gameContainer}>
      <div className={styles.nowPlayingContainer}>
        <ProgressBar survivalLevel={nowPlaying.xp} />

        <div className={styles.survivalMeta}>
          <h2>{nowPlaying?.name}</h2>
          {/* <span>Proximo Nível em: 3 Pontos</span> */}
        </div>

        <div className={styles.survivalImageContainer}>
          <div className={styles.controlPannel}>
            <button className={styles.controllers} onClick={prevWave}>
              <FiChevronLeft />
            </button>

            <button className={styles.controllers} onClick={decreaseSurvivalXP}>
              <FiMinus />
            </button>
          </div>

          <Image
            width={100}
            height={150}
            src={`/f${nowPlaying?.id}.webp`}
            objectFit="cover"
            objectPosition="left"
          />

          <div className={styles.controlPannel}>
            <button className={styles.controllers} onClick={nextWave}>
              <FiChevronRight />
            </button>

            <button className={styles.controllers} onClick={increaseSurvivalXP}>
              <FiPlus />
            </button>
          </div>
        </div>

        <div className={styles.skillsOptions}>
          <select name="blue" id="blue">
            <option value="1">{nowPlaying.defaultSkill}</option>
          </select>

          <select name="yellow" id="yellow" disabled={nowPlaying.xp < 7}>
            {nowPlaying.levels.map((level) => {
              const { yellow } = level;

              return yellow["skill-options"].map(({ skill }, index) => (
                <option value={index} key={index}>
                  {skill}
                </option>
              ));
            })}
          </select>

          <select name="orange" id="orange" disabled={nowPlaying.xp < 19}>
            {nowPlaying.levels.map((level) => {
              const { orange } = level;

              return orange["skill-options"].map(({ skill }, index) => (
                <option value={index} key={index}>
                  {skill}
                </option>
              ));
            })}
          </select>

          <select name="red" id="red" disabled={nowPlaying.xp !== 43}>
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
          (survival, key) =>
            survival?.id !== nowPlaying?.id && (
              <button
                className={styles.survival}
                key={key}
                onClick={() => handleNextGameTurn(survival)}
              >
                <span>{survival.name}</span>

                <Image
                  width={120}
                  height={86}
                  src={`/f${survival?.id}.webp`}
                  objectFit="cover"
                />
              </button>
            )
        )}
      </div>
    </section>
  );
}

export default Game;
