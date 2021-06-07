import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type ProgressBarProps = {
  survivalLevel: number;
};

function ProgressBar({ survivalLevel }: ProgressBarProps) {
  const [maxLevel, setMaxLevel] = useState(43);
  const [levels, setLevels] = useState<number[]>([0]);

  useEffect(() => {
    generateProgressBarArray();
  }, [maxLevel]);

  function generateProgressBarArray() {
    let x = 0;
    let levelsItems = [];
    setLevels([]);

    while (x <= maxLevel) {
      levelsItems.push(x);
      x++;
    }

    setLevels(levelsItems);
  }

  function getColorClass(level: number) {
    if (level === 43) {
      return styles.red;
    }

    if (level >= 19) {
      return styles.orange;
    }

    if (level >= 7) {
      return styles.yellow;
    }

    return styles.blue;
  }

  return (
    <div className={styles.progressContainer}>
      {levels?.map((level) => {
        let itemClassName = getColorClass(level);

        return (
          <div
            className={`${itemClassName} ${styles.levelItem} ${
              survivalLevel === level ? styles.active : ""
            }`}
            key={level}
          >
            {level}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
