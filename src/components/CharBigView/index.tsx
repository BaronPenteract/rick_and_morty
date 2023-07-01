import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import AddCharSVG from "../svg/AddCharSVG";
import RemoveCharSVG from "../svg/RemoveCharSVG";

type TCharBigViewProps = {
  char: CharType | undefined;
};

const CharBigView: React.FC<TCharBigViewProps> = ({ char }) => {
  const [isAdded, setIsAdded] = React.useState(false);

  if (!char) {
    return <h2>Something wrong.</h2>;
  }

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
    setIsAdded((prev) => !prev);
  };

  const genderSymbol = (gender: string): JSX.Element => {
    if (gender === "Male") {
      return <>&#9794; {gender}</>;
    }

    if (gender === "Female") {
      return <>&#9792; {gender}</>;
    }

    return <>{gender}</>;
  };

  return (
    <article>
      <div className={`${styles.root}`}>
        <div className={styles.header}>
          <img className={styles.avatar} src={image} alt={name} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>
          <ul className={styles.info}>
            <li>
              Origin: <span>{origin.name}</span>
            </li>
            <li>
              Last known location: <span>{location.name}</span>
            </li>
            <li>
              First seen in:: <span>{episode[0]}</span>
            </li>
            <li>
              Episodes: <span>{episode.length}</span>
            </li>
          </ul>
        </div>
        <div className={styles.footer}>
          {/* <p>
            sex: <span className={styles.gender}>{genderSymbol(gender)}</span>
          </p> */}
          <ul className={styles.footerAbout}>
            <li>
              <span>{species}</span>
            </li>
            <li>
              <span className={styles[status]}>{status}</span>
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
      </div>
    </article>
  );
};

export default CharBigView;
