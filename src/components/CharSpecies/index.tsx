import styles from "./index.module.scss";
import React from "react";

type TCharSpeciesProps = {
  species: string;
};

const CharSpecies: React.FC<TCharSpeciesProps> = ({ species }) => {
  return (
    <span className={styles.root} title="Species">
      {species}
    </span>
  );
};

export default CharSpecies;
