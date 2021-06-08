import Image from "next/image";
import { useState } from "react";
import { useSurvival } from "../../contexts/charSelecteds";

import styles from "./styles.module.scss";

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

type SurvivalCardProps = {
  survival: Survival;
};

function SurvivalCard({ survival }: SurvivalCardProps) {
  const [selected, setSelected] = useState(false);
  const { handleAddSurvival } = useSurvival();

  function handleSelect(survival: Survival) {
    setSelected(!selected);
    const isSelected = !selected;

    if (isSelected) {
      handleAddSurvival(survival);
    }
  }

  return (
    <button
      className={styles.cardContainer}
      onClick={() => handleSelect(survival)}
    >
      <Image
        width={380}
        height={260}
        src={`/f${survival.id}.webp`}
        objectFit="cover"
        objectPosition="top"
        className={!selected ? styles.disabled : ""}
      />

      <div className={styles.cardBody}>
        <h2>{survival?.name}</h2>

        <p>{survival?.text}</p>
      </div>
    </button>
  );
}

export default SurvivalCard;
