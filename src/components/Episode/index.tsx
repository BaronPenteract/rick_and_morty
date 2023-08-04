import React from "react";
import { motion } from "framer-motion";

import { IEpisodeProps } from "../../@types/episodes";
import { CharType } from "../../@types/chars";
import { getIdFromURL } from "../../utils/getIdFromURL";
import { useAppDispatch } from "../../redux/store";
import { fetchCharsByIds } from "../../redux/chars/charsSlice";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";
import CharSmallList from "../CharSmallList";
import { Status } from "../../utils/constants";
import Preloader from "../Preloader";

import styles from "./index.module.scss";
import { cardAnim } from "../Animations";

// кол-во отображаемых персов в карточке эпизода
const charsToShowCount = 5;

const Episode: React.FC<IEpisodeProps> = ({ episode, onClick }) => {
  const dispatch = useAppDispatch();

  const { status } = useSelector(getCharsSelector);

  const { id, name, episode: code, characters, url } = episode;

  const [charsInEpisode, setCharsInEpisode] = React.useState<CharType[]>([]);

  // айдишники всех персов из эпизода
  const charsInEpisodeIds: number[] = characters.map((charLink) => {
    return getIdFromURL(charLink);
  });

  // айди персов, котрых мы будем запрашивать с апи
  const charsInEpisodeIdsToFetch: number[] = [];

  for (let i = 0; i < charsToShowCount; i++) {
    const randIndex = Math.round(Math.random() * charsInEpisodeIds.length - 1);

    charsInEpisodeIdsToFetch.push(charsInEpisodeIds[randIndex]);
  }

  React.useEffect(() => {
    dispatch(fetchCharsByIds({ ids: charsInEpisodeIdsToFetch }))
      .unwrap()
      .then((res) => {
        setCharsInEpisode(res);
      });
  }, []);

  const handleEpisodeClick: React.MouseEventHandler = (e) => {
    onClick(id);
  };

  return (
    <motion.article initial="hidden" whileInView="visible">
      <motion.div variants={cardAnim} className={`${styles.root}`}>
        <div className={styles.header} onClick={handleEpisodeClick}>
          <p className={styles.number}>{id}</p>
        </div>
        <div className={styles.content}>
          <h2 className={styles.name} title={name} onClick={handleEpisodeClick}>
            {name}
          </h2>
          {status === Status.LOADING ? (
            <Preloader />
          ) : (
            <CharSmallList chars={charsInEpisode} />
          )}
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Episode;
