import React, { ReactElement } from "react";
import ErrorBlock from "../ErrorBlock";
import CharMoreButton from "../CharMoreButton";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";
import { like, dislike } from "../../redux/chars/charsSlice";
import CharStatus from "../CharStatus";
import CharToggleAddButton from "../CharToggleAddButton";
import { IEpisode } from "../../@types/episodes";
import { getIdFromURL } from "../../utils/getIdFromURL";
import { fetchEpisodesByIds } from "../../redux/episodes/episodesSlice";

import styles from "./index.module.scss";
import Preloader from "../Preloader";
import { Link } from "react-router-dom";
import { rootPath } from "../../utils/constants";

type TCharBigViewProps = {
  charId: number;
};

const CharBigView: React.FC<TCharBigViewProps> = ({ charId }) => {
  const dispatch = useAppDispatch();

  // эпизоды, в которых был конкретный char
  const [episodesOfChar, setEpisodesOfChar] = React.useState<IEpisode[]>();

  const char = useSelector(getCharsSelector).chars.find(
    (char) => char.id == charId
  );

  React.useEffect(() => {
    if (!char) return;

    const episodesIds: number[] = char.episode.map((url) => {
      return getIdFromURL(url);
    });

    dispatch(fetchEpisodesByIds({ ids: episodesIds }))
      .unwrap()
      .then((res) => {
        setEpisodesOfChar(res);
      });
  }, [char]);

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

  if (episodesOfChar) {
    episodesOfChar.forEach((episode, idx) => {
      if (idx > 4) return;

      episodesToShow.push(<li>{episode.name}</li>);
    });
  }

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
              First seen in:
              <span title="First seen in">
                {episodesOfChar ? (
                  <Link to={rootPath + "/episode/" + episodesOfChar[0].id}>
                    {episodesOfChar[0].name}
                  </Link>
                ) : (
                  <Preloader />
                )}
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.episodes}>
          <span className={styles.title}>Episodes: </span>
          <span className={styles.number} title="Number of episodes">
            {episode.length}
          </span>
        </div>
        <div className={styles.buttonsContainer}>
          <CharMoreButton id={id} />
          <CharToggleAddButton
            isLiked={isLiked ? isLiked : false}
            onClick={handleToggleClick}
          />
        </div>
      </div>
    </article>
  );
};

export default CharBigView;
