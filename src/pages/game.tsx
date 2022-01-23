import { useEffect, useState } from "react";
import {
  FiChevronRight,
  FiChevronLeft,
  FiPlus,
  FiMinus,
  FiHome,
} from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";

import ProgressBar from "../components/Progress";

import styles from "../styles/game.module.scss";
import { useSurvival } from "../contexts/charSelecteds";
import gameFlow from "../util/gameFlow";
import ZombieCard from "../components/ZombieCard";
import ShowSurvival from "../components/ShowSurvival";

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
    nowPlaying,
    handleSetSurvivalXP,
    nextWave,
    prevWave,
    startGame,
    isZombieTurn,
    handleHideZombie,
    wave,
  } = useSurvival();
  const [playerTurn, setPlayerTurn] = useState(3);
  const ZOMBIE_AUTO_HIDE_TIME = 6000; // Time in milliseconds
  const [showSurvivalInfo, setShowSurvivalInfo] = useState(false);
  const [showingSurvival, setShowingSurvival] = useState<
    Survival | undefined
  >();

  useEffect(() => {
    if (!nowPlaying?.id) {
      const parseSurvivals = gameFlow(selectedSurvivals);
      startGame(parseSurvivals);
      return;
    }
  }, [nowPlaying]);

  useEffect(() => {
    if (isZombieTurn) {
      handleZombieTurn();
    }
  }, [isZombieTurn]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardPress);

    return () => {
      document.removeEventListener("keydown", handleKeyboardPress);
    };
  }, [wave, nowPlaying, showSurvivalInfo]);

  function handleKeyboardPress(event: KeyboardEvent) {
    const eventCode = event.code;

    if (!showSurvivalInfo) {
      executeAction(eventCode);
    }
  }

  function executeAction(code: string) {
    const action = {
      ArrowLeft: () => prevWave(),
      ArrowRight: () => nextWave(),
      ArrowUp: () => increaseSurvivalXP(),
      ArrowDown: () => decreaseSurvivalXP(),
    };

    if (typeof action[code] === "function") {
      console.log("It's a function");
      action[code]();
    }
  }

  function increaseSurvivalXP() {
    handleSetSurvivalXP(nowPlaying, "plus");
  }

  function decreaseSurvivalXP() {
    handleSetSurvivalXP(nowPlaying, "minus");
  }

  function handleZombieTurn() {
    setTimeout(() => {
      handleHideZombie();
    }, ZOMBIE_AUTO_HIDE_TIME);
  }

  function handleCloseSurvivalModal() {
    setShowSurvivalInfo(false);
  }

  function handleShowSurvivalModal(survival: Survival) {
    setShowingSurvival(survival);
    setShowSurvivalInfo(true);
  }

  if (selectedSurvivals.length === 0 || !nowPlaying?.id) {
    return (
      <div className={styles.gameContainer}>
        <h2>Loading</h2>
      </div>
    );
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

          {isZombieTurn && (
            <div className={styles.zombieContainer}>
              <ZombieCard />
            </div>
          )}

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
                onClick={() => handleShowSurvivalModal(survival)}
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

      <div className={styles.footer}>
        <Link href="/" prefetch>
          <a className={styles.btnBackHome}>
            <FiHome />
            Página inicial
          </a>
        </Link>
      </div>

      {showSurvivalInfo && (
        <ShowSurvival
          survival={showingSurvival}
          closeModal={handleCloseSurvivalModal}
        />
      )}
    </section>
  );
}

export default Game;
