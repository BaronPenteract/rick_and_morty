import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchChars } from "../../redux/chars/charsSlice";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";
import { BASE_URL } from "../../utils/constants";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import CharList from "../../components/CharList";
import { getPageFromURL } from "../../utils/getPageFromURL";

const Characters: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickPage = async (page: number | null) => {
    if (!page) return;
    setIsLoading(true);
    await dispatch(fetchChars(page));
    setIsLoading(false);
  };

  React.useEffect(() => {
    dispatch(fetchChars(null))
      .unwrap()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const { chars, prevPage, nextPage, pages, currentPage } =
    useSelector(getCharsSelector);

  return (
    <div className={styles.root}>
      <SearchForm />
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={getPageFromURL(prevPage)}
        nextPage={getPageFromURL(nextPage)}
        pages={pages}
      />

      {isLoading ? <Preloader /> : <CharList chars={chars} />}
      <Pagination
        handleClickPage={handleClickPage}
        currentPage={currentPage}
        prevPage={getPageFromURL(prevPage)}
        nextPage={getPageFromURL(nextPage)}
        pages={pages}
      />
    </div>
  );
};

export default Characters;
