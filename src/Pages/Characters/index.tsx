import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Status } from "../../utils/constants";

const Characters: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { chars, prevPage, nextPage, pages, currentPage, status } =
    useSelector(getCharsSelector);

  // при 1й загрузке получаем первую страницу и кол-во страниц всего, чтобы в след-ем Эффекте ограничить максимально возможное кол-во страниц в
  React.useEffect(() => {
    dispatch(setCurrentPage(null));
    dispatch(fetchChars({}))
      .unwrap()
      .catch((e) => {
        setErr(new Error(e.error));
      });
  }, []);

  React.useEffect(() => {
    let page = Number(searchParams.get("page")) || 1;
    let name = searchParams.get("name") || "";

    if (page < 0) {
      page = 1;
    }
    // здесь, чтобы ограничить ввод максимальным числом, нужно знать сколько всего страниц
    if (page > pages) {
      page = pages;
    }

    const filterParams = { name, page };

    dispatch(setCurrentPage(page));
    dispatch(setFilterParams(filterParams));
    dispatch(fetchChars(filterParams))
      .unwrap()
      .then(() => {
        setSearchParams({ page: page.toString(), name });
      })
      .catch((e) => {
        setErr(new Error(e.error));
      });
  }, [pages]);

  const handleClickPage = async (page: number | null) => {
    if (!page || status !== Status.SUCCESS) return;
    let name = searchParams.get("name") || "";

    setSearchParams({ page: page.toString(), name });

    dispatch(setCurrentPage(page));
    await dispatch(fetchChars({ page, name }));
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
        <SearchForm onSubmit={handleSearchSubmit} status={status} />
        <ErrorBlock err={err} />
      </div>
    );
  }

  return (
    <section className={styles.root} aria-label="Characters of Rick and Morty">
      <SearchForm onSubmit={handleSearchSubmit} status={status} />
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        numbersOfPagesToShow={5}
        pages={pages}
        status={status}
      />
      {status === Status.LOADING ? <Preloader /> : <CharList chars={chars} />}
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

export default Characters;
