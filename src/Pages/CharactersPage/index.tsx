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
import { PROJECT_TITLE, Status } from "../../utils/constants";
import { CharType } from "../../@types/chars";

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
    if (location.search) {
      let page = Number(searchParams.get("page")) || 1;
      let name = searchParams.get("name") || "";
      if (page < 0) {
        page = 1;
      }
      const filterParams = { name, page };

      dispatch(setFilterParams(filterParams));
      dispatch(setCurrentPage(page));
      dispatch(fetchChars(filterParams))
        .unwrap()
        .catch((e) => {
          setErr(new Error(e.error || "Check your internet connection."));
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
    dispatch(fetchChars(filterParams)); /* 
      .unwrap()
      .catch((e) => {
        setErr(new Error(e.error || "Something wrong."));
      }); */
  }, [filterParams]);

  const handleClickPage = async (page: number | null) => {
    if (!page || status !== Status.SUCCESS) return;
    let name = searchParams.get("name") || "";

    setSearchParams({ page: page.toString(), name });

    //dispatch(setCurrentPage(page));
    //await dispatch(fetchChars({ page, name }));
  };

  const handleSearchSubmit: THandleSearchSubmit = ({ name }) => {
    if (status === Status.LOADING) return;

    setSearchParams({ page: "1", name });

    dispatch(setCurrentPage(1));
    dispatch(fetchChars({ name }));
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
        filterParams={filterParams}
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
