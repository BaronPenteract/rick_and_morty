import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchChars } from "../../redux/chars/charsSlice";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";
import { BASE_URL } from "../../utils/constants";
import Char from "../Char";

import styles from "./index.module.scss";
import Preloader from "../Preloader";
import SearchForm from "../SearchForm";
import Pagination from "../Pagination";

const CharList: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

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

      {isLoading ? (
        <Preloader />
      ) : (
        <ul className={styles.charsList}>
          {chars.map((char) => (
            <li key={char.id}>
              <Char {...char} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharList;
