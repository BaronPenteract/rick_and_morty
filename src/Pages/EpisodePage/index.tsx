import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import { THandleSearchSubmit } from "../../@types/TSearchForm";
import ErrorBlock from "../../components/ErrorBlock";
import { Status } from "../../utils/constants";
import {
  fetchEpisode,
  fetchEpisodes,
  setCurrentPage,
} from "../../redux/episodes/episodesSlice";
import { getEpisodesSelector } from "../../redux/episodes/selectors";
import EpisodesList from "../../components/EpisodesList";
import { IEpisode } from "../../@types/episodes";
import CharList from "../../components/CharList";
import { CharType } from "../../@types/chars";
import { fetchCharsByIds } from "../../redux/chars/charsSlice";
import { getIdFromURL } from "../../utils/getIdFromURL";
import { getCharsSelector } from "../../redux/chars/selectors";

const EpisodePage: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));
  const [episode, setEpisode] = React.useState<IEpisode>();

  const [charsInEpisode, setCharsInEpisode] = React.useState<CharType[]>([]);

  const dispatch = useAppDispatch();
  const { status } = useSelector(getEpisodesSelector);
  const { chars } = useSelector(getCharsSelector);

  const params = useParams();
  const episodeId = Number(params.id);

  React.useEffect(() => {
    (async function () {
      await dispatch(fetchEpisode({ id: episodeId }))
        .unwrap()
        .then((res) => {
          setEpisode(res);
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

  if (!episode) {
    return (
      <section>
        <Preloader />
      </section>
    );
  }

  const { id, name, episode: code, characters, url, air_date } = episode;

  return (
    <section className={styles.root} aria-label={`Episode: ${episode?.name}`}>
      <div className={styles.rootBG}>
        {charsInEpisode.map((char) => {
          return <img key={char.id} src={char.image} alt="background" />;
        })}
      </div>
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
