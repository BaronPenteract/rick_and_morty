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
import { CharType } from "../../@types/chars";

type TCharListProps = {
  chars: CharType[];
};

const CharList: React.FC<TCharListProps> = ({ chars }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <Char {...char} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharList;
