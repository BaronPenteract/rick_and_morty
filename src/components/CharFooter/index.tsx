import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import CharToggleAddButton from "../CharToggleAddButton";
import { useAppDispatch } from "../../redux/store";
import { dislike, like } from "../../redux/chars/charsSlice";

type TCharFooterProps = {
  char: CharType;
};

const CharFooter: React.FC<TCharFooterProps> = ({ char }) => {
  const dispatch = useAppDispatch();

  const {
    id,
    name,
    image,
    gender,
    species,
    status,
    origin,
    location,
    episode,
  } = char;

  const isLiked = char.isLiked ? true : false;

  const handleToggleClick: React.MouseEventHandler = (e) => {
    if (!isLiked) {
      dispatch(like(char));
    } else {
      dispatch(dislike(char));
    }
  };

  return (
    <div className={styles.footer}>
      <ul className={styles.footerAbout}>
        <li>
          <span
            className={styles[status]}
            title={`${
              gender === "Male" ? "He" : gender === "Female" ? "She" : "It"
            } is ${status}`}
          >
            {status}
          </span>
        </li>
      </ul>
      <CharToggleAddButton isLiked={isLiked} onClick={handleToggleClick} />
    </div>
  );
};

export default CharFooter;
