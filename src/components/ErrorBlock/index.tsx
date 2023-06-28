import React from "react";
import styles from "./index.module.scss";

type TErrorBlockProps = {
  err: Error;
};

const ErrorBlock: React.FC<TErrorBlockProps> = ({ err }) => {
  return (
    <div className={styles.root}>
      <div className={styles.message}>{err.message}</div>
    </div>
  );
};

export default ErrorBlock;
