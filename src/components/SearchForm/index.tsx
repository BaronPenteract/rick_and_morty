import React from "react";
import styles from "./index.module.scss";

const SearchForm: React.FC = () => {
  return (
    <form className={styles.root}>
      <fieldset className={styles.fieldset}>
        <input className={styles.input} type="text" />
      </fieldset>
      <button className={styles.submit} type="submit">
        search
      </button>
    </form>
  );
};

export default SearchForm;
