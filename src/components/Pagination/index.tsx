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
  numbersOfPagesToShow: number;
};

const Pagination: React.FC<TPaginationProps> = ({
  handleClickPage,
  currentPage,
  prevPage,
  nextPage,
  pages,
  numbersOfPagesToShow,
}) => {
  const navigate = useNavigate();

  // чтобы не отображались все номера страниц разом (1 2 3 4 5 ...), а было что-то типа: ...5 6 7 8 9 ...
  const startNumberOfPageToShow =
    Math.ceil(currentPage - numbersOfPagesToShow / 2) > 0
      ? Math.ceil(currentPage - numbersOfPagesToShow / 2)
      : 1;
  const endNumberOfPageToShow =
    Math.floor(currentPage + numbersOfPagesToShow / 2) <= pages
      ? Math.floor(currentPage + numbersOfPagesToShow / 2)
      : pages;

  let pageList: ReactElement<HTMLLIElement>[] = [];

  for (let i = startNumberOfPageToShow; i <= endNumberOfPageToShow; i++) {
    const liElement: ReactElement<HTMLLIElement> = (
      <li key={i}>
        <button
          className={`${styles.button} ${
            currentPage === i ? styles.buttonActive : ""
          }`}
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
        className={styles.button}
        onClick={() => {
          handleClickPage(prevPage);
        }}
      >
        <LeftArrowSVG className={styles.svg} />
      </button>
      <ul className={styles.pageList}>{pageList}</ul>
      <button
        className={styles.button}
        onClick={() => {
          handleClickPage(nextPage);
        }}
      >
        <RightArrowSVG className={styles.svg} />
      </button>
    </nav>
  );
};

export default Pagination;
