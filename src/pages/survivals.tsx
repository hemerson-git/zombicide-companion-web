import { useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";

import Link from "next/link";

import styles from "../styles/survivals.module.scss";

import SurvivalCard from "../components/SurvivalCard";
import { useSurvival } from "../contexts/charSelecteds";

function Survivals() {
  const { survivals, resetSelectedSurvivals } = useSurvival();

  useEffect(() => {
    resetSelectedSurvivals();
  }, []);

  return (
    <section className={styles.survivalSelectContainer}>
      <h1> Survival List </h1>

      <div className={styles.survivalsContainer}>
        {survivals?.map((survival) => {
          return <SurvivalCard key={survival.id} survival={survival} />;
        })}
      </div>

      <Link href="/game">
        <a className={styles.btnGameStart}>
          <FiChevronRight />
        </a>
      </Link>
    </section>
  );
}

export default Survivals;
