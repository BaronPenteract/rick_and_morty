import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

type TPaginationProps = {
  handleClickPage: (page: string | null) => void;
  prevPage: string | null;
  nextPage: string | null;
};

const Pagination: React.FC<TPaginationProps> = ({
  handleClickPage,
  prevPage,
  nextPage,
}) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.root}>
      <button
        onClick={() => {
          handleClickPage(prevPage);
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          handleClickPage(nextPage);
        }}
      >
        next
      </button>
    </nav>
  );
};

export default Pagination;
