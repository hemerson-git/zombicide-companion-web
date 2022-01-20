import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";

import styles from "./styles.module.scss";
import ProgressBar from "../Progress";
import { useEffect } from "react";
import { useSurvival } from "../../contexts/charSelecteds";

interface SkillOptionsProps {
  "skill-options": {
    skill: string;
  }[];
}

interface Survival {
  id: string;
  name: string;
  text: string;
  defaultSkill: string;
  xp: number;
  userLevel: number;
  levels: {
    yellow: SkillOptionsProps;
    orange: SkillOptionsProps;
    red: SkillOptionsProps;
  }[];
}

interface IShowSurvival {
  survival: Survival;
  closeModal: () => void;
}

function ShowSurvival(params: IShowSurvival) {
  const { survival, closeModal } = params;
  const { handleSetSurvivalXP } = useSurvival();

  useEffect(() => {
    document.addEventListener("keydown", handleCloseModal);

    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, []);

  function handleCloseModal(event: KeyboardEvent) {
    const { code } = event;

    if (code === "Escape") {
      closeModal();
    }
  }

  // search for what is causing the change of all survivals at once

  function increaseSurvivalXP() {
    // handleSetSurvivalXP(survival, "plus");
  }

  function decreaseSurvivalXP() {
    // handleSetSurvivalXP(survival, "minus");
  }

  if (!survival) {
    return <div></div>;
  }

  return (
    <div className={styles.showSurvivalContainer}>
      <div className={styles.progressContainer}>
        <ProgressBar survivalLevel={survival?.xp} />
      </div>

      <h1 className={styles.survivalName}>{survival?.name}</h1>

      <button onClick={() => closeModal()} className={styles.btnCloseModal}>
        <FiX />
      </button>

      <div className="survivalContainer">
        <button className={styles.btnXp} onClick={decreaseSurvivalXP}>
          <FiMinus />
        </button>

        <Image src={`/f${survival?.id}.webp`} width={250} height={250} />

        <button className={styles.btnXp} onClick={increaseSurvivalXP}>
          <FiPlus />
        </button>
      </div>

      <p>{survival?.text}</p>
    </div>
  );
}

export default ShowSurvival;
