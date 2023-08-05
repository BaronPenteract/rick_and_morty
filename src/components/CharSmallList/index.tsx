import React from "react";

import styles from "./index.module.scss";
import { CharType } from "../../@types/chars";
import { rootPath } from "../../utils/constants";
import { Link } from "react-router-dom";

type TCharListProps = {
  chars: CharType[];
};

const CharSmallList: React.FC<TCharListProps> = ({ chars }) => {
  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <Link to={rootPath + "/character/" + char.id}>
              <img
                loading="lazy"
                src={char.image}
                alt={char.name}
                title={char.name}
              />
            </Link>
          </li>
        ))}
        {/* 
        <li>
          <span>&#8230;</span>
        </li> */}
      </ul>
    </div>
  );
};

export default CharSmallList;
