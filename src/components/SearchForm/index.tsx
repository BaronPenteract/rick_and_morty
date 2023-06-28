import React, { ReactElement } from "react";
import styles from "./index.module.scss";
import SearchSVG from "../svg/SearchSVG";
import { TSearchFormProps } from "../../@types/TSearchForm";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";

const SearchForm: React.FC<TSearchFormProps> = ({ onSubmit }) => {
  const { filterParams } = useSelector(getCharsSelector);

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    if (filterParams.name) setSearchValue(filterParams.name);
  }, [filterParams]);

  const nameRef = React.useRef<HTMLInputElement>(null);

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    onSubmit({ name: nameRef.current?.value || "" });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form name="searchForm" onSubmit={submitHandler} className={styles.root}>
      <fieldset className={styles.fieldset}>
        <input
          ref={nameRef}
          name="search"
          className={styles.search}
          type="input"
          value={searchValue}
          onChange={handleChange}
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
