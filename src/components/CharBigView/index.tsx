import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import ErrorBlock from "../ErrorBlock";
import CharFooter from "../CharFooter";
import CharMoreButton from "../CharMoreButton";

type TCharBigViewProps = {
  char: CharType | undefined;
};

const CharBigView: React.FC<TCharBigViewProps> = ({ char }) => {
  const [isAdded, setIsAdded] = React.useState(false);

  if (!char) {
    return <ErrorBlock err={new Error("Something wrong.")} />;
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
    url,
  } = char;

  return (
    <article>
      <div className={`${styles.root}`}>
        <div className={styles.header}>
          <img className={styles.avatar} src={image} alt={name} />
        </div>
        <div className={styles.content}>
          <div>
            <h2 className={styles.name} title="Name">
              {name}
            </h2>
            <p className={styles.subTitle}>
              <span title="Gender" className={styles.gender}>
                {gender}
              </span>
              <span title="Species">{species}</span>
            </p>
          </div>
          <ul className={styles.info}>
            <li>
              Origin: <span title="Origin">{origin.name}</span>
            </li>
            <li>
              Last known location:
              <span title="Last known location">{location.name}</span>
            </li>
            <li>
              First seen in: <span title="First seen in">{episode.length}</span>
            </li>
            <li>
              Episodes: <span title="Number of episodes">{episode.length}</span>
            </li>
          </ul>
          <div className={styles.moreButtonContainer}>
            <CharMoreButton id={id} />
          </div>
        </div>
        <CharFooter char={char} isAdded={isAdded} setIsAdded={setIsAdded} />
        <ul className={styles.episodes}>
          {episode.map((episode, idx) => (
            <li key={idx}>{idx}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default CharBigView;
