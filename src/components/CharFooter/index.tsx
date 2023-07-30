import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import CharToggleAddButton from "../CharToggleAddButton";
import { useAppDispatch } from "../../redux/store";
import { dislike, like } from "../../redux/chars/charsSlice";
import CharStatus from "../CharStatus";

type TCharFooterProps = {
  char: CharType;
  handleToggleClick: React.MouseEventHandler;
};

const CharFooter: React.FC<TCharFooterProps> = ({
  char,
  handleToggleClick,
}) => {
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

  return (
    <div className={styles.footer}>
      <ul className={styles.footerAbout}>
        <li>
          <CharStatus status={status} />
        </li>
      </ul>
      <CharToggleAddButton isLiked={isLiked} onClick={handleToggleClick} />
    </div>
  );
};

export default CharFooter;
