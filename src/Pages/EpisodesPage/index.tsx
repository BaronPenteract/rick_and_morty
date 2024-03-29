import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import { THandleSearchSubmit } from "../../@types/TSearchForm";
import ErrorBlock from "../../components/ErrorBlock";
import {
  INTERNET_CONNTECTION_ERROR,
  NOT_FOUND_ERROR,
  PROJECT_TITLE,
  Status,
} from "../../utils/constants";
import {
  fetchEpisodes,
  setCurrentPage,
  setFilterParams,
} from "../../redux/episodes/episodesSlice";
import { getEpisodesSelector } from "../../redux/episodes/selectors";
import EpisodesList from "../../components/EpisodesList";
import { IFilterParamsEpisodes } from "../../@types/episodes";

const EpisodesPage: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error(NOT_FOUND_ERROR));
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    episodes,
    pages,
    currentPage,
    nextPage,
    prevPage,
    status,
    filterParams,
  } = useSelector(getEpisodesSelector);

  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    if (location.search) {
      let page = Number(searchParams.get("page")) || 1;
      let name = searchParams.get("name") || "";
      if (page < 0) {
        page = 1;
      }
      const filterParams = { name, page };

      dispatch(setFilterParams(filterParams));
      dispatch(setCurrentPage(page));
      dispatch(fetchEpisodes(filterParams))
        .unwrap()
        .catch((e) => {
          setErr(new Error(e.error || INTERNET_CONNTECTION_ERROR));
        });
    } else {
      dispatch(setFilterParams({}));
      dispatch(setCurrentPage(1));
    }
  }, [location.search, navigate]);

  React.useEffect(() => {
    dispatch(fetchEpisodes(filterParams))
      .unwrap()
      .catch((e) => {
        setErr(new Error(e.error || INTERNET_CONNTECTION_ERROR));
      });
  }, [filterParams]);

  const handleSearchSubmit: THandleSearchSubmit = (
    searchParamsFromForm: IFilterParamsEpisodes
  ) => {
    if (status === Status.LOADING) return;

    setSearchParams({
      ...searchParamsFromForm,
      page: "1",
    });

    dispatch(setCurrentPage(1));
    dispatch(fetchEpisodes(searchParamsFromForm));
  };

  const handleClickPage = (page: number | null) => {
    if (!page || status !== Status.SUCCESS) return;
    let name = searchParams.get("name") || "";

    setSearchParams({ page: page.toString(), name });
    dispatch(fetchEpisodes({ page, name }))
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
        <ErrorBlock err={err} />
      </section>
    );
  }

  return (
    <section
      className={styles.root}
      aria-label={`Episodes of ${PROJECT_TITLE}`}
    >
      <h1 className={styles.root__title}>{`Episodes of ${PROJECT_TITLE}`}</h1>
      <SearchForm
        onSubmit={handleSearchSubmit}
        filterEpisodesParams={filterParams}
        status={Status.SUCCESS}
      />
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

export default EpisodesPage;
