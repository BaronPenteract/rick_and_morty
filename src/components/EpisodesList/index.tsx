import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import { IEpisode } from "../../@types/episodes";

import styles from "./index.module.scss";
import Episode from "../Episode";

interface IEpisodesListProps {
  episodes: IEpisode[];
}

const EpisodesList: React.FC<IEpisodesListProps> = ({ episodes }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Episode episode={episode} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodesList;
