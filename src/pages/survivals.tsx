import { FiChevronRight } from "react-icons/fi";

import styles from "../styles/survivals.module.scss";

import SurvivalCard from "../components/SurvivalCard";
import { SurvivalSelectProvider, useSurvival } from "../contexts/charSelecteds";

function Survivals() {
  const { survivals } = useSurvival();

  return (
    <section className={styles.survivalSelectContainer}>
      <h1> Survival List </h1>

      <div className={styles.survivalsContainer}>
        {survivals?.map((survival) => {
          let { name, id, text } = survival;
          return (
            <SurvivalCard key={survival.id} survival={{ name, id, text }} />
          );
        })}
      </div>

      <a href="/game" className={styles.btnGameStart}>
        <FiChevronRight />
      </a>
    </section>
  );
}

export default Survivals;
