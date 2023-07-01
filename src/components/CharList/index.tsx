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
  const [charToModal, setCharToModal] = React.useState<CharType>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleCharClick: (char: CharType) => void = (char) => {
    setIsMoreModalOpen(true);
    setCharToModal(char);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <Char
              char={char}
              onCharClick={() => {
                handleCharClick(char);
              }}
            />
          </li>
        ))}
      </ul>
      <Modal isOpen={isMoreModalOpen} setIsOpen={setIsMoreModalOpen}>
        <CharBigView char={charToModal} />
      </Modal>
    </div>
  );
};

export default CharList;
