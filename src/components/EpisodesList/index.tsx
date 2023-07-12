import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import { IEpisode } from "../../@types/episodes";

import styles from "./index.module.scss";
import Episode from "../Episode";
import ErrorBlock from "../ErrorBlock";
import { rootPath } from "../../utils/constants";

interface IEpisodesListProps {
  episodes: IEpisode[];
}

const EpisodesList: React.FC<IEpisodesListProps> = ({ episodes }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEpisodeClick: (episodeId: number) => void = (episodeId) => {
    navigate(rootPath + "/episode/" + episodeId);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Episode episode={episode} onClick={handleEpisodeClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodesList;
