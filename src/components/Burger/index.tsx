import React from "react";

import { ReactComponent as Image } from "../../assets/images/burger.svg";

import styles from "./index.module.scss";

interface IBurgerProps {
  isBurgerActive: boolean;
  setIsBurgerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Burger: React.FC<IBurgerProps> = ({
  isBurgerActive,
  setIsBurgerActive,
}) => {
  return (
    <>
      <button
        className={`${styles.root} ${isBurgerActive ? styles.root_active : ""}`}
        onClick={() => setIsBurgerActive(!isBurgerActive)}
      >
        <Image className={styles.image} />
      </button>
    </>
  );
};

export default Burger;
