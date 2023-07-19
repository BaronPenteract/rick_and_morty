import styles from "./index.module.scss";
import React from "react";
import RemoveCharSVG from "../svg/RemoveCharSVG";
import AddCharSVG from "../svg/AddCharSVG";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { CharType } from "../../@types/chars";
import { getCharsSelector } from "../../redux/chars/selectors";
import { dislike, like } from "../../redux/chars/charsSlice";

type TCharToggleAddButtonProps = {
  isLiked: boolean;
  onClick: React.MouseEventHandler;
};

const CharToggleAddButton: React.FC<TCharToggleAddButtonProps> = ({
  isLiked,
  onClick,
}) => {
  return (
    <button
      className={`${styles.root} ${isLiked ? styles.rootRemove : ""}`}
      onClick={onClick}
      title="Add to favorite"
    >
      {isLiked ? (
        <RemoveCharSVG className={styles.svg} />
      ) : (
        <AddCharSVG className={styles.svg} />
      )}
    </button>
  );
};

export default CharToggleAddButton;
