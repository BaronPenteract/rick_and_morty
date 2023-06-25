import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import AddCharSVG from "../svg/AddCharSVG";
import OpenInfoSVG from "../svg/OpenInfoSVG";
import CloseInfoSVG from "../svg/CloseInfoSVG";
import RemoveCharSVG from "../svg/RemoveCharSVG";

const Char: React.FC<CharType> = ({
  id,
  name,
  image,
  gender,
  species,
  status,
  origin,
  location,
  episode,
}) => {
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(false);

  const handleClickInfoToggle = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const handleAddClick: React.MouseEventHandler = (e) => {
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
      <div className={`${styles.root} ${isInfoOpen ? styles.rootActive : ""}`}>
        <button
          className={styles.buttonOpenInfo}
          onClick={handleClickInfoToggle}
        >
          <OpenInfoSVG className={styles.openSVG} />
        </button>
        <img className={styles.avatar} src={image} alt={name} />
        <div className={styles.header}>
          <h2 className={styles.name}>{name}</h2>
          <button className={styles.buttonAddRemove} onClick={handleAddClick}>
            {isAdded ? (
              <RemoveCharSVG className={styles.removeSVG} />
            ) : (
              <AddCharSVG className={styles.addSVG} />
            )}
          </button>
        </div>
        <div className={styles.content}>
          <button
            className={styles.buttonCloseInfo}
            onClick={handleClickInfoToggle}
          >
            <CloseInfoSVG className={styles.closeSVG} />
          </button>
          <p className={styles.name}>{name}</p>
          <ul className={styles.contentFooter}>
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
          <div className={styles.footer}>
            <p>
              sex: <span className={styles.gender}>{genderSymbol(gender)}</span>
            </p>
            <p>
              species: <span>{species}</span>
            </p>
            <p>
              status: <span className={styles[status]}>{status}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Char;
