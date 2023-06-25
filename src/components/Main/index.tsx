import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

const Main: React.FC = () => {
  const navigate = useNavigate();

  const handleClickGetChars = () => {
    navigate("/characters");
  };

  const handleClickGetLocations = () => {
    navigate("/locations");
  };

  const handleClickGetEpisodes = () => {
    navigate("/episodes");
  };

  return (
    <nav className={styles.root}>
      <button className={styles.button} onClick={handleClickGetChars}>
        <p>Characters</p>
      </button>
      <button className={styles.button} onClick={handleClickGetLocations}>
        <p>Locations</p>
      </button>
      <button className={styles.button} onClick={handleClickGetEpisodes}>
        <p>Episodes</p>
      </button>
    </nav>
  );
};

export default Main;
