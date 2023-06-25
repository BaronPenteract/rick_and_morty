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

const Characters: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickPage = async (url: string | null) => {
    if (!url) return;
    setIsLoading(true);
    await dispatch(fetchChars(url));
    setIsLoading(false);
  };

  React.useEffect(() => {
    dispatch(fetchChars(BASE_URL + "/character"))
      .unwrap()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const { chars, prevPage, nextPage } = useSelector(getCharsSelector);

  return (
    <div className={styles.root}>
      <SearchForm />
      <Pagination
        handleClickPage={handleClickPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />

      {isLoading ? <Preloader /> : <CharList />}
    </div>
  );
};

export default Characters;
