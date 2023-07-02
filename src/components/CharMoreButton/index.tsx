import styles from "./index.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { rootPath } from "../../utils/constants";

type TCharMoreButtonProps = {
  id: number;
};

const CharMoreButton: React.FC<TCharMoreButtonProps> = ({ id }) => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler = (e) => {
    navigate(rootPath + "/character/" + id);
  };

  return (
    <button className={`${styles.root}`} onClick={handleClick} title="More">
      More
    </button>
  );
};

export default CharMoreButton;
