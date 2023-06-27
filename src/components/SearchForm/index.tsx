import React, { ReactElement } from "react";
import styles from "./index.module.scss";
import SearchSVG from "../svg/SearchSVG";
import { TSearchFormProps } from "../../@types/TSearchForm";

const SearchForm: React.FC<TSearchFormProps> = ({ onSubmit }) => {
  const nameRef = React.useRef<HTMLInputElement>(null);

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit({ name: nameRef.current?.value || "" });
  };

  return (
    <form name="searchForm" onSubmit={submitHandler} className={styles.root}>
      <fieldset className={styles.fieldset}>
        <input
          ref={nameRef}
          name="search"
          className={styles.search}
          type="input"
          placeholder="Search by name"
        />
      </fieldset>
      <button className={styles.submit} type="submit">
        <SearchSVG className={styles.svg} />
      </button>
    </form>
  );
};

export default SearchForm;
