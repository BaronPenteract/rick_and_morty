import { CharType } from "../../@types/chars";

import styles from "./index.module.scss";
import React from "react";
import CharMoreButton from "../CharMoreButton";
import { useAppDispatch } from "../../redux/store";
import { dislike, like } from "../../redux/chars/charsSlice";
import CharStatus from "../CharStatus";
import CharToggleAddButton from "../CharToggleAddButton";
import { motion } from "framer-motion";
import { cardAnim } from "../Animations";

type TCharProps = {
  char: CharType;
  onCharClick: () => void;
};

const Char: React.FC<TCharProps> = ({ char, onCharClick }) => {
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
    url,
    isLiked,
  } = char;

  const handleToggleClick: React.MouseEventHandler = (e) => {
    if (!isLiked) {
      dispatch(like(char));
    } else {
      dispatch(dislike(char));
    }
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={cardAnim} className={`${styles.root}`}>
        <div className={styles.header} onClick={() => onCharClick()}>
          <div className={styles.avatar_container}>
            <img className={styles.avatar} src={image} alt={name} />
          </div>
        </div>
        <div className={styles.content}>
          <h2
            className={styles.name}
            title="Name"
            onClick={() => onCharClick()}
          >
            {name}
          </h2>
          <ul className={styles.info}>
            <li>
              <span title="Gender" className={styles.gender}>
                {gender}
              </span>
            </li>
            <li>
              <span title="Species">{species}</span>
            </li>
          </ul>
          <div className={styles.moreButtonContainer}>
            <CharMoreButton id={id} />
          </div>
          <div className={styles.footer}>
            <CharStatus status={status} />
            <CharToggleAddButton char={char} />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Char;
