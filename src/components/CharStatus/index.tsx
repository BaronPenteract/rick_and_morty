import { ECharStatus } from "../../utils/constants";
import styles from "./index.module.scss";
import React from "react";

type TCharStatusProps = {
  status: ECharStatus;
};

const CharStatus: React.FC<TCharStatusProps> = ({ status }) => {
  return <span className={styles[status]}>{status}</span>;
};

export default CharStatus;
