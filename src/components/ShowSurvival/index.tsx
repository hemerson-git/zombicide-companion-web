import { FiX } from "react-icons/fi";
import Image from "next/image";

import styles from "./styles.module.scss";
import ProgressBar from "../Progress";
import { useEffect } from "react";

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

      <Image src={`/f${survival?.id}.webp`} width={250} height={250} />

      <p>{survival?.text}</p>
    </div>
  );
}

export default ShowSurvival;
