import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import { THandleSearchSubmit } from "../../@types/TSearchForm";
import ErrorBlock from "../../components/ErrorBlock";
import { Status } from "../../utils/constants";
import {
  fetchEpisodes,
  setCurrentPage,
} from "../../redux/episodes/episodesSlice";
import { getEpisodesSelector } from "../../redux/episodes/selectors";
import EpisodesList from "../../components/EpisodesList";

const Episodes: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchEpisodes({}))
      .unwrap()
      .then((res) => {});
  }, []);

  const { episodes, pages, currentPage, nextPage, prevPage, status } =
    useSelector(getEpisodesSelector);

  const handleSearchSubmit: THandleSearchSubmit = () => {
    console.log("Episodes search submit");
  };

  const handleClickPage = (page: number | null) => {
    if (!page || status !== Status.SUCCESS) return;
    dispatch(fetchEpisodes({ page }))
      .unwrap()
      .then((res) => {
        dispatch(setCurrentPage(page));
      });
  };

  if (status === Status.ERROR) {
    return (
      <section
        className={styles.root}
        aria-label="Some error of characters of Rick and Morty"
      >
        <SearchForm onSubmit={handleSearchSubmit} status={status} />
        <ErrorBlock err={err} />
      </section>
    );
  }

  return (
    <section className={styles.root} aria-label="Characters of Rick and Morty">
      <SearchForm onSubmit={handleSearchSubmit} status={Status.SUCCESS} />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        numbersOfPagesToShow={5}
        handleClickPage={handleClickPage}
        status={status}
      />
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <EpisodesList episodes={episodes} />
      )}
      <Pagination
        pages={pages}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        numbersOfPagesToShow={5}
        handleClickPage={handleClickPage}
        status={status}
      />
    </section>
  );
};

export default Episodes;
