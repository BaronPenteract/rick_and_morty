import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React, { ReactElement } from "react";
import ErrorBlock from "../ErrorBlock";
import CharFooter from "../CharFooter";
import CharMoreButton from "../CharMoreButton";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";
import { like, dislike } from "../../redux/chars/charsSlice";

type TCharBigViewProps = {
  charId: number;
};

const CharBigView: React.FC<TCharBigViewProps> = ({ charId }) => {
  const dispatch = useAppDispatch();

  const char = useSelector(getCharsSelector).chars.find(
    (char) => char.id == charId
  );

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
    isLiked,
  } = char;

  const handleToggleClick: React.MouseEventHandler = (e) => {
    if (!isLiked) {
      dispatch(like(char));
    } else {
      dispatch(dislike(char));
    }
  };

  let episodesToShow: ReactElement<HTMLLIElement>[] = [];

  episode.forEach((ep, idx) => {
    if (idx > 3) return;

    episodesToShow.push(<li key={idx}>{idx}</li>);
  });

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
        <CharFooter char={char} handleToggleClick={handleToggleClick} />
        <ul className={styles.episodes}>
          {episodesToShow}
          {episode.length > 4 ? <CharMoreButton id={id} /> : ""}
        </ul>
      </div>
    </article>
  );
};

export default CharBigView;
