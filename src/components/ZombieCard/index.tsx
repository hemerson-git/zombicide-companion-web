import { useEffect } from "react";
import styles from "./styles.module.scss";

interface IZombieCard {
  onCreateCard?: () => void;
  onRemoveCard?: () => void;
}

function ZombieCard(params: IZombieCard) {
  useEffect(() => {
    if (params.onCreateCard) {
      params.onCreateCard();
    }

    return params.onRemoveCard || null;
  }, []);

  return (
    <div className={styles.zombieCard}>
      {/* <Image src="/fwalker.jpg" alt="Zombie Image" width={300} height={300} /> */}

      <iframe
        src="https://embed.lottiefiles.com/animation/83427"
        aria-label="Zombie Animation"
        width={300}
        height={300}
      ></iframe>

      <h2>Turno dos Zumbis!</h2>
    </div>
  );
}

export default ZombieCard;
