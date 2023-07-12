import React from "react";
import styles from "./index.module.scss";
import SearchSVG from "../svg/SearchSVG";
import { TSearchFormProps } from "../../@types/TSearchForm";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";
import Preloader from "../Preloader";
import { Status } from "../../utils/constants";

const SearchForm: React.FC<TSearchFormProps> = ({
  onSubmit,
  filterParams,
  status,
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (filterParams.name) setSearchValue(filterParams.name);
  }, [filterParams]);

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit({ name: searchValue || "" });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form name="searchForm" onSubmit={submitHandler} className={styles.root}>
      <fieldset className={styles.fieldset}>
        <input
          name="search"
          className={styles.search}
          type="input"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search by name"
          disabled={status === Status.LOADING}
        />
      </fieldset>
      <button
        className={styles.submit}
        type="submit"
        disabled={status === Status.LOADING}
      >
        {status === Status.LOADING ? (
          <Preloader />
        ) : (
          <SearchSVG className={styles.svg} />
        )}
      </button>
    </form>
  );
};

export default SearchForm;
