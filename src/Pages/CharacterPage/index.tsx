import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChar } from "../../redux/chars/charsSlice";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import ErrorBlock from "../../components/ErrorBlock";
import { CharType } from "../../@types/chars";
import { Status } from "../../utils/constants";
import { getIdFromURL } from "../../utils/getIdFromURL";
import { IEpisode } from "../../@types/episodes";
import { fetchEpisodesByIds } from "../../redux/episodes/episodesSlice";
import EpisodesList from "../../components/EpisodesList";
import LeftArrowSVG from "../../components/svg/LeftArrowSVG";
import CharToggleAddButton from "../../components/CharToggleAddButton";
import CharStatus from "../../components/CharStatus";
import CharGender from "../../components/CharGender";
import CharSpecies from "../../components/CharSpecies";

const CharacterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const [char, setChar] = React.useState<CharType>();
  // эпизоды, в которых был конкретный char
  const [episodesOfChar, setEpisodesOfChar] = React.useState<IEpisode[]>();

  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));

  //берем статус загрузки
  const fetchStatus = useSelector(getCharsSelector).status;

  const charId = Number(params.id);

  React.useEffect(() => {
    window.scroll(0, 0);

    dispatch(fetchChar({ id: charId }))
      .unwrap()
      .then((res) => {
        setChar(res);
      })
      .catch((e) => {
        setErr(new Error(e.error));
      });
  }, []);

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

  const { favChars } = useSelector(getCharsSelector);

  if (fetchStatus === Status.ERROR) {
    return <ErrorBlock err={err} />;
  }
  if (!char) {
    return <Preloader />;
  }

  const {
    id,
    name,
    image,
    gender,
    type,
    species,
    status,
    origin,
    location,
    episode,
    url,
  } = char;

  const isLiked = favChars.find((favChar) => favChar.id === id) ? true : false;
  char.isLiked = isLiked;

  const handleBackClick: React.MouseEventHandler = (e) => {
    navigate(-1);
  };

  return (
    <section className={styles.root}>
      <div className={`${styles.header} ${styles.container}`}>
        <button className={styles.backButton} onClick={handleBackClick}>
          <LeftArrowSVG className={styles.backButton__svg} />
        </button>
        <div className={styles.title}>
          <h1 className={styles.name} title="Name">
            {name}
          </h1>
          <CharSpecies species={species} />
        </div>
        <CharToggleAddButton char={char} className={styles.toogleAddButton} />
      </div>
      <div className={`${styles.content} ${styles.container}`}>
        <div className={styles.contentHeader}>
          <div className={styles.avatar}>
            <img src={image} alt={name} />
            <CharGender gender={gender} />
            <CharStatus status={status} />
          </div>
        </div>
        <div className={styles.contentMain}>
          <ul className={styles.info}>
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
                {episodesOfChar ? episodesOfChar[0].name : <Preloader />}
              </span>
            </li>
            <li>
              <span>Episodes: </span>
              <span title="Number of episodes">{episode.length}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.episodes} ${styles.container}`}>
        <h2 className={styles.episodes__title}>In episodes</h2>
        {episodesOfChar ? (
          <EpisodesList episodes={episodesOfChar} />
        ) : (
          <Preloader />
        )}
      </div>
    </section>
  );
};

export default CharacterPage;
