import { MouseEvent } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

import Link from "next/link";

import styles from "./styles.module.scss";

type ModalProps = {
  visible: boolean;
  setVisible: (prevState: boolean) => void;
};

function NewgameAlert({ visible, setVisible }: ModalProps) {
  function handleChangeVisibility() {
    setVisible(!visible);
  }

  return (
    <section
      className={`${styles.modal} ${!visible ? styles.hidden : ""}`}
      onClick={handleChangeVisibility}
    >
      <div
        className={styles.modalContent}
        onClick={(event: MouseEvent) => event.stopPropagation()}
      >
        <div className={styles.iconContainer}>
          <FiAlertTriangle className={styles.icon} />
        </div>

        <div className={styles.modalHeader}>
          <h1>Há um jogo salvo</h1>

          <button type="button" onClick={handleChangeVisibility}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p>
            Você tem certeza que deseja iniciar um novo jogo? <br />
            Isso apagará todos os dados do jogo anterior.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <Link href="/survivals">
            <a className={styles.btnContinue}>Continuar</a>
          </Link>

          <button
            type="button"
            className={styles.btnCancel}
            onClick={handleChangeVisibility}
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewgameAlert;
