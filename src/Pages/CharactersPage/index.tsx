import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchChars, setFilterParams } from "../../redux/chars/charsSlice";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import CharList from "../../components/CharList";
import { setCurrentPage } from "../../redux/chars/charsSlice";
import { THandleSearchSubmit } from "../../@types/TSearchForm";
import ErrorBlock from "../../components/ErrorBlock";
import {
  INTERNET_CONNTECTION_ERROR,
  PROJECT_TITLE,
  Status,
} from "../../utils/constants";
import { CharType, IFilterParamsChars } from "../../@types/chars";

const CharactersPage: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));
  const [searchParams, setSearchParams] = useSearchParams();
  const [charsToRender, setCharsToRender] = React.useState<CharType[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    chars,
    prevPage,
    nextPage,
    pages,
    currentPage,
    status,
    filterParams,
  } = useSelector(getCharsSelector);

  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    if (location.search) {
      let page = Number(searchParams.get("page")) || 1;
      let name = searchParams.get("name") || "";
      let statusInSearch = searchParams.get("status") || "";
      let gender = searchParams.get("gender") || "";

      if (page < 0) {
        page = 1;
      }
      const filterParams = { name, page, status: statusInSearch, gender };

      dispatch(setFilterParams(filterParams));
      dispatch(setCurrentPage(page));
      dispatch(fetchChars(filterParams))
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
    setCharsToRender(chars);
  }, [chars]);

  React.useEffect(() => {
    dispatch(fetchChars(filterParams));
  }, [filterParams]);

  const handleClickPage = async (page: number | null) => {
    if (!page || status !== Status.SUCCESS) return;

    let name = searchParams.get("name") || "";
    let statusInSearch = searchParams.get("status") || "";
    let gender = searchParams.get("gender") || "";

    setSearchParams({
      page: page.toString(),
      name,
      status: statusInSearch,
      gender,
    });
  };

  const handleSearchSubmit: THandleSearchSubmit = (
    searchParamsFromForm: IFilterParamsChars
  ) => {
    setSearchParams({
      ...searchParamsFromForm,
      page: "1",
    });

    if (status === Status.LOADING) return;
    dispatch(fetchChars(searchParamsFromForm));
  };

  if (status === Status.ERROR) {
    return (
      <div className={styles.root}>
        <ErrorBlock err={err} />
      </div>
    );
  }

  return (
    <section
      className={styles.root}
      aria-label={`Characters of ${PROJECT_TITLE}`}
    >
      <h1 className={styles.root__title}>{`Characters of ${PROJECT_TITLE}`}</h1>
      <SearchForm
        onSubmit={handleSearchSubmit}
        filterCharsParams={filterParams}
        status={status}
      />
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        numbersOfPagesToShow={5}
        pages={pages}
        status={status}
      />
      {status === Status.LOADING ? (
        <Preloader />
      ) : (
        <CharList chars={charsToRender} />
      )}
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        numbersOfPagesToShow={5}
        pages={pages}
        status={status}
      />
    </section>
  );
};

export default CharactersPage;
