import { GetServerSideProps } from "next";

import styles from "../styles/survivals.module.scss";

import server from "../../server.json";
import SurvivalCard from "../components/SurvivalCard";

type SurvivalProps = {
  id: string;
  name: string;
  defaultSkill: string;
};

function Survivals() {
  const { characters: survivals } = server;

  return (
    <section className={styles.survivalSelectContainer}>
      <h1> Survival List </h1>

      <div className={styles.survivalsContainer}>
        {survivals.map((survival) => {
          let { name, id, text } = survival;
          return (
            <SurvivalCard key={survival.id} survival={{name, id, text}} />
          )
        })}
      </div>

      <a href="/game" className={styles.btnGameStart}>
        =>
      </a>
    </section>
  );
}

export default Survivals;

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: [],
//     notFound: "blocking",
//   };
// };
