import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import LeftArrowSVG from "../svg/LeftArrowSVG";
import RightArrowSVG from "../svg/RightArrowSVG";

type TPaginationProps = {
  handleClickPage: (page: number | null) => void;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  pages: number;
};

const Pagination: React.FC<TPaginationProps> = ({
  handleClickPage,
  currentPage,
  prevPage,
  nextPage,
  pages,
}) => {
  const navigate = useNavigate();

  let pageList: ReactElement<HTMLLIElement>[] = [];

  for (let i = 1; i <= pages; i++) {
    const liElement: ReactElement<HTMLLIElement> = (
      <li key={i}>
        <button
          type="button"
          onClick={() => {
            handleClickPage(i);
          }}
        >
          {i}
        </button>
      </li>
    );

    pageList.push(liElement);
  }

  return (
    <nav className={styles.root}>
      <button
        className={styles.prev}
        onClick={() => {
          handleClickPage(prevPage);
        }}
      >
        <LeftArrowSVG className={styles.svg} />
      </button>
      <ul className={styles.pageList}>{pageList}</ul>
      <button
        onClick={() => {
          handleClickPage(nextPage);
        }}
      >
        <RightArrowSVG className={styles.next} />
      </button>
    </nav>
  );
};

export default Pagination;
