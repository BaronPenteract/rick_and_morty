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

const EpisodePage: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));
  const [episode, setEpisode] = React.useState<IEpisode>();

  const [charsInEpisode, setCharsInEpisode] = React.useState<CharType[]>([]);

  const dispatch = useAppDispatch();
  const { status } = useSelector(getEpisodesSelector);

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
    if (!episode) return;

    // айдишники всех персов из эпизода
    const charsInEpisodeIds: number[] = characters.map((charLink) => {
      return getIdFromURL(charLink);
    });

    dispatch(fetchCharsByIds({ ids: charsInEpisodeIds }))
      .unwrap()
      .then((res) => {
        setCharsInEpisode(res);
      });
  }, [episode]);

  if (!episode) {
    return (
      <section>
        <Preloader />
      </section>
    );
  }

  const { id, name, episode: code, characters, url } = episode;

  return (
    <section className={styles.root} aria-label={`Episode: ${episode?.name}`}>
      <div className={styles.rootBG}>
        {charsInEpisode.map((char) => {
          return <img key={char.id} src={char.image} alt="background" />;
        })}
      </div>
      <div className={`${styles.root}`}>
        <div className={styles.header}>
          <p className={styles.number}>{id}</p>
          <h2 className={styles.name} title={name}>
            {name}
          </h2>
        </div>
        <div className={styles.content}>
          <CharList chars={charsInEpisode} />
        </div>
      </div>
    </section>
  );
};

export default EpisodePage;
