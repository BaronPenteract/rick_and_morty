import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import AddCharSVG from "../svg/AddCharSVG";
import RemoveCharSVG from "../svg/RemoveCharSVG";

type TCharFooterProps = {
  char: CharType;
  isAdded: boolean;
  setIsAdded: (isAdded: boolean) => void;
};

const CharFooter: React.FC<TCharFooterProps> = ({
  char,
  isAdded,
  setIsAdded,
}) => {
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
  } = char;

  const handleToggleAddClick: React.MouseEventHandler = (e) => {
    console.log("Chars: Added");
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.footer}>
      <ul className={styles.footerAbout}>
        <li>
          <span
            className={styles[status]}
            title={`${
              gender === "Male" ? "He" : gender === "Female" ? "She" : "It"
            } is ${status}`}
          >
            {status}
          </span>
        </li>
      </ul>
      <button
        className={`${styles.toggleButton} ${
          isAdded ? styles.toggleButtonRemove : ""
        }`}
        onClick={handleToggleAddClick}
        title="Add to favorite"
      >
        {isAdded ? (
          <RemoveCharSVG className={styles.svg} />
        ) : (
          <AddCharSVG className={styles.svg} />
        )}
      </button>
    </div>
  );
};

export default CharFooter;
