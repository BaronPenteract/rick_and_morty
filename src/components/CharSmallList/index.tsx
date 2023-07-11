import React from "react";

import styles from "./index.module.scss";
import { CharType } from "../../@types/chars";

type TCharListProps = {
  chars: CharType[];
};

const CharSmallList: React.FC<TCharListProps> = ({ chars }) => {
  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <img
              loading="lazy"
              src={char.image}
              alt={char.name}
              title={char.name}
            />
          </li>
        ))}
        <li>
          <span>&#8230;</span>
        </li>
      </ul>
    </div>
  );
};

export default CharSmallList;
