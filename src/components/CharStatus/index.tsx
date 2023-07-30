import styles from "./index.module.scss";
import React from "react";

type TCharStatusProps = {
  status: "Alive" | "Dead" | "unknown";
};

const CharStatus: React.FC<TCharStatusProps> = ({ status }) => {
  return <span className={styles[status]}>{status}</span>;
};

export default CharStatus;
