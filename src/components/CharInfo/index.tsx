import { Link } from "react-router-dom";
import { CharType } from "../../@types/chars";
import { IEpisode } from "../../@types/episodes";
import { useAppDispatch } from "../../redux/store";
import { rootPath } from "../../utils/constants";
import styles from "./index.module.scss";
import React from "react";

type TCharInfoProps = {
  char: CharType;
  firstSeenInEpisode: IEpisode;
};

const CharInfo: React.FC<TCharInfoProps> = ({ char, firstSeenInEpisode }) => {
  const dispatch = useAppDispatch();

  const { id, type, origin, location, episode, url } = char;

  return (
    <ul className={styles.root}>
      {type ? (
        <li>
          <span>Type: </span>
          <span title="Type">{type}</span>
        </li>
      ) : (
        ""
      )}
      <li>
        <span>Origin: </span>
        <span title="Origin">{origin.name}</span>
      </li>
      <li>
        <span>Last known location: </span>
        <span title="Last known location">{location.name}</span>
      </li>
      <li>
        <span>First seen in </span>
        <span title="First seen in">
          <Link
            className={styles.root__link}
            to={rootPath + "/episode/" + firstSeenInEpisode.id}
          >
            {firstSeenInEpisode.name}
          </Link>
        </span>
      </li>
      <li>
        <span>Episodes: </span>
        <span title="Number of episodes">{episode.length}</span>
      </li>
    </ul>
  );
};

export default CharInfo;
