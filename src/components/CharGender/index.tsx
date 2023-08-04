import styles from "./index.module.scss";
import React from "react";

type TCharGenderProps = {
  gender: "Female" | "Male" | "Genderless" | "unknown";
};

const CharGender: React.FC<TCharGenderProps> = ({ gender }) => {
  return (
    <span title="Gender" className={`${styles.root} ${styles[gender]}`}>
      {gender}
    </span>
  );
};

export default CharGender;
