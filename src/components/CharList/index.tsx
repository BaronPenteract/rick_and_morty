import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import Char from "../Char";

import styles from "./index.module.scss";
import { CharType } from "../../@types/chars";
import Modal from "../Modal";
import CharBigView from "../CharBigView";

type TCharListProps = {
  chars: CharType[];
};

const CharList: React.FC<TCharListProps> = ({ chars }) => {
  const [isMoreModalOpen, setIsMoreModalOpen] = React.useState(false);
  const [charIdToModal, setCharIdToModal] = React.useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (!isMoreModalOpen) {
      setCharIdToModal(0);
    }
  }, [isMoreModalOpen]);

  const handleCharClick: (id: number) => void = (id) => {
    setIsMoreModalOpen(true);
    setCharIdToModal(id);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <Char
              char={char}
              onCharClick={() => {
                handleCharClick(char.id);
              }}
            />
          </li>
        ))}
      </ul>
      <Modal isOpen={isMoreModalOpen} setIsOpen={setIsMoreModalOpen}>
        <CharBigView charId={charIdToModal} />
      </Modal>
    </div>
  );
};

export default CharList;
