import styles from "./index.module.scss";
import React, { useEffect } from "react";

import AddCharSVG from "../svg/AddCharSVG";
import { useAppDispatch } from "../../redux/store";
import { CharType } from "../../@types/chars";
import { dislike, like } from "../../redux/chars/charsSlice";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";

type TCharToggleAddButtonProps = {
  char: CharType;
  onClick?: Function;
  className?: string;
};

const CharToggleAddButton: React.FC<TCharToggleAddButtonProps> = ({
  char,
  onClick,
  className,
}) => {
  const dispatch = useAppDispatch();

  //const isLiked = char.isLiked || false;
  const isLiked = useSelector(getCharsSelector).favChars.find(
    (item) => item.id === char.id
  )
    ? true
    : false;

  const handleToggleClick: React.MouseEventHandler = (e) => {
    if (onClick) onClick();

    if (!isLiked) {
      dispatch(like(char));
    } else {
      dispatch(dislike(char));
    }
  };

  return (
    <button
      className={`${styles.root} ${
        isLiked ? styles.root_active : ""
      } ${className}`}
      onClick={handleToggleClick}
      title="Add to favorite"
    >
      <AddCharSVG className={styles.svg} />
    </button>
  );
};

export default CharToggleAddButton;
