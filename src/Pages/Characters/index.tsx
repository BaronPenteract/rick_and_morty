import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchChars } from "../../redux/chars/charsSlice";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import CharList from "../../components/CharList";
import { setCurrentPage } from "../../redux/chars/charsSlice";
import { THandleSearchSubmit } from "../../@types/TSearchForm";

const Characters: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { chars, prevPage, nextPage, pages, currentPage } =
    useSelector(getCharsSelector);

  // при 1й загрузке получаем первую страницу и кол-во страниц всего, чтобы в след-ем Эффекте ограничить максимально возможное кол-во страниц в
  React.useEffect(() => {
    dispatch(setCurrentPage(null));
    dispatch(fetchChars({}))
      .unwrap()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    let page = Number(searchParams.get("page")) || 1;

    if (page < 0) {
      page = 1;
    }
    // здесь, чтобы ограничить ввод максимальным числом, нужно знать сколько всего страниц
    if (page > pages) {
      page = pages;
    }

    dispatch(setCurrentPage(page));
    dispatch(fetchChars({ page }))
      .unwrap()
      .then(() => {
        setSearchParams({ page: page.toString() });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pages]);

  const handleClickPage = async (page: number | null) => {
    if (!page || isLoading) return;

    setSearchParams({ page: page.toString() });

    setIsLoading(true);
    dispatch(setCurrentPage(page));
    await dispatch(fetchChars({ page }));
    setIsLoading(false);
  };

  const handleSearchSubmit: THandleSearchSubmit = ({ name }) => {
    console.log(name);
  };

  return (
    <div className={styles.root}>
      <SearchForm onSubmit={handleSearchSubmit} />
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        numbersOfPagesToShow={5}
        pages={pages}
      />

      {isLoading ? <Preloader /> : <CharList chars={chars} />}
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        numbersOfPagesToShow={5}
        pages={pages}
      />
    </div>
  );
};

export default Characters;
