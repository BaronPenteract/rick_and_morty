import React from "react";

import CharMoreButton from "../CharMoreButton";
import { useAppDispatch } from "../../redux/store";
import CharStatus from "../CharStatus";
import CharToggleAddButton from "../CharToggleAddButton";
import { IEpisode } from "../../@types/episodes";
import { getIdFromURL } from "../../utils/getIdFromURL";
import { fetchEpisodesByIds } from "../../redux/episodes/episodesSlice";

import Preloader from "../Preloader";
import CharGender from "../CharGender";
import CharSpecies from "../CharSpecies";
import CharInfo from "../CharInfo";
import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import {
  INTERNET_CONNTECTION_ERROR,
  NOT_FOUND_ERROR,
  Status,
} from "../../utils/constants";
import { useSelector } from "react-redux";
import { getEpisodesSelector } from "../../redux/episodes/selectors";
import ErrorBlock from "../ErrorBlock";

type TCharBigViewProps = {
  char: CharType | undefined;
};

const CharBigView: React.FC<TCharBigViewProps> = ({ char }) => {
  const [err, setErr] = React.useState<Error>(new Error(NOT_FOUND_ERROR));
  const dispatch = useAppDispatch();

  // эпизоды, в которых был конкретный char
  const [episodesOfChar, setEpisodesOfChar] = React.useState<IEpisode[]>();

  React.useEffect(() => {
    if (!char) return;

    const episodesIds: number[] = char.episode.map((url) => {
      return getIdFromURL(url);
    });

    dispatch(fetchEpisodesByIds({ ids: episodesIds }))
      .unwrap()
      .then((res) => {
        setEpisodesOfChar(res);
      })
      .catch((e) => {
        setErr(new Error(e.error || INTERNET_CONNTECTION_ERROR));
      });
  }, [char]);

  const { status: fetchEpisodeStatus } = useSelector(getEpisodesSelector);

  if (!char) {
    return <Preloader />;
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

  return (
    <article>
      <div className={`${styles.root}`}>
        <div className={styles.header}>
          <div className={styles.status}>
            <CharStatus status={status} />
          </div>
          <img className={styles.avatar} src={image} alt={name} />
          <h2 className={styles.name} title="Name">
            {name}
          </h2>
        </div>
        <div className={styles.content}>
          <div>
            <p className={styles.subTitle}>
              <CharGender gender={gender} />
              <CharSpecies species={species} />
            </p>
          </div>
          <div className={styles.info}>
            {fetchEpisodeStatus === Status.ERROR ? (
              <ErrorBlock err={err} />
            ) : episodesOfChar ? (
              <CharInfo char={char} firstSeenInEpisode={episodesOfChar[0]} />
            ) : (
              <Preloader />
            )}
          </div>
        </div>
        <div className={styles.episodes}>
          <span className={styles.title}>Episodes: </span>
          <span className={styles.number} title="Number of episodes">
            {episode.length}
          </span>
        </div>
        <div className={styles.buttonsContainer}>
          <CharMoreButton id={id} />
          <CharToggleAddButton char={char} />
        </div>
      </div>
    </article>
  );
};

export default CharBigView;
