import React from "react";
import Char from "../Char";

import styles from "./index.module.scss";
import { CharType } from "../../@types/chars";

type TCharListProps = {
  chars: CharType[];
};

const CharList: React.FC<TCharListProps> = ({ chars }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <Char char={char} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharList;
