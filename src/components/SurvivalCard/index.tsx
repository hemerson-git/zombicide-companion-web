import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.scss";

type Survival = {
  id: string;
  name: string;
  text: string;
};

type SurvivalCardProps = {
  survival: Survival;
};

function SurvivalCard({ survival }: SurvivalCardProps) {
  const [selected, setSelected] = useState(false);

  function handleSelect() {
    setSelected(!selected);
  }

  return (
    <button className={styles.cardContainer} onClick={handleSelect}>
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
