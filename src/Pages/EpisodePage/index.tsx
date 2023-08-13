import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppDispatch } from "../../redux/store";

import episodesBG from "../../assets/images/episodes-bg.jpg";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import { fetchEpisode } from "../../redux/episodes/episodesSlice";
import { IEpisode } from "../../@types/episodes";
import CharList from "../../components/CharList";
import { CharType } from "../../@types/chars";
import { fetchCharsByIds } from "../../redux/chars/charsSlice";
import { getIdFromURL } from "../../utils/getIdFromURL";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useScrollAnim } from "../../components/hooks/useScrollAnim";
import {
  INTERNET_CONNTECTION_ERROR,
  NOT_FOUND_ERROR,
  Status,
} from "../../utils/constants";
import ErrorBlock from "../../components/ErrorBlock";
import { getEpisodesSelector } from "../../redux/episodes/selectors";

const EpisodePage: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error(NOT_FOUND_ERROR));
  const [episode, setEpisode] = React.useState<IEpisode>();

  const [charsInEpisode, setCharsInEpisode] = React.useState<CharType[]>([]);

  const dispatch = useAppDispatch();
  const { chars } = useSelector(getCharsSelector);

  const params = useParams();
  const episodeId = Number(params.id);

  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    (async function () {
      await dispatch(fetchEpisode({ id: episodeId }))
        .unwrap()
        .then((res) => {
          setEpisode(res);
        })
        .catch((e) => {
          setErr(new Error(e.error || INTERNET_CONNTECTION_ERROR));
        });
    })();
  }, []);

  React.useEffect(() => {
    setCharsInEpisode(chars);
  }, [chars]);

  React.useEffect(() => {
    if (!episode) return;

    // айдишники всех персов из эпизода
    const charsInEpisodeIds: number[] = characters.map((charLink) => {
      return getIdFromURL(charLink);
    });

    dispatch(fetchCharsByIds({ ids: charsInEpisodeIds }));
  }, [episode]);

  const { backgroundTopPosition, backgroundOpacity } = useScrollAnim();

  //берем статус загрузки
  const fetchStatus = useSelector(getEpisodesSelector).status;

  if (fetchStatus === Status.ERROR) {
    return <ErrorBlock err={err} />;
  }
  if (!episode) {
    return (
      <section className={styles.root} aria-label={`Loading`}>
        <Preloader />
      </section>
    );
  }

  const { id, name, episode: code, characters, url, air_date } = episode;

  return (
    <section className={styles.root} aria-label={`Episode: ${episode?.name}`}>
      <motion.div
        className={styles.rootBG}
        style={{ top: backgroundTopPosition, opacity: backgroundOpacity }}
      >
        {/* 
        {charsInEpisode.map((char) => {
          return <img key={char.id} src={char.image} alt="background" />;
        })} */}
        <img src={episodesBG} alt="background" />
      </motion.div>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.title}>
            <span className={styles.prefix}>Episode #{id}:</span>
            <h2 className={styles.name} title={name}>
              {name}
            </h2>
          </div>
          <div className={styles.containerFooter}>
            <p className={styles.code}>{code}</p>
            <p className={styles.date}>Air date: {air_date}</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <CharList chars={charsInEpisode} />
      </div>
    </section>
  );
};

export default EpisodePage;
