import React, { ReactElement } from "react";

import styles from "./index.module.scss";
import LeftArrowSVG from "../svg/LeftArrowSVG";
import RightArrowSVG from "../svg/RightArrowSVG";
import LeftArrowWithLineSVG from "../svg/LeftArrowWithLineSVG";
import RightArrowWithLineSVG from "../svg/RightArrowWithLineSVG";
import { Status } from "../../redux/chars/charsSlice";
import Preloader from "../Preloader";

type TPaginationProps = {
  handleClickPage: (page: number | null) => void;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  pages: number;
  numbersOfPagesToShow: number;
  status: Status;
};

const Pagination: React.FC<TPaginationProps> = ({
  handleClickPage,
  currentPage,
  prevPage,
  nextPage,
  pages,
  numbersOfPagesToShow,
  status,
}) => {
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
            if (currentPage === i) return;
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
        className={`${styles.button}`}
        onClick={() => {
          handleClickPage(1);
        }}
        title="First page"
        disabled={currentPage === 1 || status !== Status.SUCCESS}
      >
        <LeftArrowWithLineSVG className={styles.svg} />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          handleClickPage(prevPage);
        }}
        title="Previous page"
        disabled={prevPage === null || status !== Status.SUCCESS}
      >
        <LeftArrowSVG className={styles.svg} />
      </button>
      {status === Status.SUCCESS ? (
        <ul className={styles.pageList}>{pageList}</ul>
      ) : (
        <Preloader className={styles.loading} />
      )}
      <button
        className={styles.button}
        onClick={() => {
          handleClickPage(nextPage);
        }}
        title="Next page"
        disabled={nextPage === null || status !== Status.SUCCESS}
      >
        <RightArrowSVG className={styles.svg} />
      </button>
      <button
        className={`${styles.button}`}
        onClick={() => {
          handleClickPage(pages);
        }}
        title="Last page"
        disabled={currentPage === pages || status !== Status.SUCCESS}
      >
        <RightArrowWithLineSVG className={styles.svg} />
      </button>
    </nav>
  );
};

export default Pagination;
