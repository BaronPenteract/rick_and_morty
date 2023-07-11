import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

import { IEpisode } from "../../@types/episodes";

import styles from "./index.module.scss";
import Episode from "../Episode";
import Modal from "../Modal";
import { CharType } from "../../@types/chars";

interface IEpisodesListProps {
  episodes: IEpisode[];
}

const EpisodesList: React.FC<IEpisodesListProps> = ({ episodes }) => {
  const [isMoreModalOpen, setIsMoreModalOpen] = React.useState(false);
  const [episodeToModal, setEpisodeToModal] = React.useState<IEpisode>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleEpisodeClick: (episode: IEpisode) => void = (episode) => {
    setIsMoreModalOpen(true);
    setEpisodeToModal(episode);
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
      <Modal isOpen={isMoreModalOpen} setIsOpen={setIsMoreModalOpen}>
        hello
      </Modal>
    </div>
  );
};

export default EpisodesList;
