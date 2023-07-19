import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import CharFooter from "../CharFooter";
import CharMoreButton from "../CharMoreButton";

type TCharProps = {
  char: CharType;
  onCharClick: () => void;
};

const Char: React.FC<TCharProps> = ({ char, onCharClick }) => {
  const {
    id,
    name,
    image,
    gender,
    species,
    status,
    origin,
    location,
    episode,
    url,
  } = char;

  return (
    <article>
      <div className={`${styles.root}`}>
        <div className={styles.header} onClick={() => onCharClick()}>
          <img className={styles.avatar} src={image} alt={name} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.name} title="Name">
            {name}
          </h2>
          <ul className={styles.info}>
            <li>
              <span title="Gender" className={styles.gender}>
                {gender}
              </span>
            </li>
            <li>
              <span title="Species">{species}</span>
            </li>
          </ul>
          <div className={styles.moreButtonContainer}>
            <CharMoreButton id={id} />
          </div>
        </div>
        <CharFooter char={char} />
      </div>
    </article>
  );
};

export default Char;
