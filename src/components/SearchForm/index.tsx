import React from "react";
import styles from "./index.module.scss";
import SearchSVG from "../svg/SearchSVG";
import {
  TActiveOptionOnClick,
  TSearchFormProps,
} from "../../@types/TSearchForm";
import Preloader from "../Preloader";
import { Status } from "../../utils/constants";
import { IFilterParamsChars } from "../../@types/chars";
import { IFilterParamsEpisodes } from "../../@types/episodes";
import CustomSelectorsBurger from "../CustomSelectorsBurger";

const SearchForm: React.FC<TSearchFormProps> = ({
  onSubmit,
  filterCharsParams,
  filterEpisodesParams,
  status,
}) => {
  const [searchParams, setSearchParams] = React.useState<
    IFilterParamsChars | IFilterParamsEpisodes
  >({});

  React.useEffect(() => {
    if (filterCharsParams) {
      setSearchParams(filterCharsParams);
    }

    if (filterEpisodesParams) {
      setSearchParams(filterEpisodesParams);
    }
  }, [filterCharsParams, filterEpisodesParams]);

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (searchParams) {
      onSubmit(searchParams);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchParams((prev) => {
      const current: IFilterParamsChars = {
        ...prev,
        [e.target.name]: e.target.value,
        page: 1,
      };

      return current;
    });
  };

  const handleOptionClick: TActiveOptionOnClick = ({ name, value }) => {
    setSearchParams((prev) => {
      const current: IFilterParamsChars = {
        ...prev,
        [name]: value,
        page: 1,
      };

      // при клике на <option> в <select> происходит отправка формы
      if (current) {
        onSubmit(current);
      }

      return current;
    });
  };

  return (
    <form name="searchForm" onSubmit={submitHandler} className={styles.root}>
      <div className={styles.container}>
        <fieldset className={styles.fieldset}>
          <input
            name="name"
            className={styles.search}
            type="input"
            value={searchParams?.name || ""}
            onChange={handleChange}
            placeholder="Search by name"
            disabled={status === Status.LOADING}
          />
        </fieldset>
        <button
          className={`${styles.button} ${styles.button_submit}`}
          type="submit"
          disabled={status === Status.LOADING}
        >
          {status === Status.LOADING ? (
            <Preloader />
          ) : (
            <SearchSVG className={styles.svg} />
          )}
        </button>
      </div>
      <CustomSelectorsBurger
        filterCharsParams={searchParams}
        status={status}
        onOptionClick={handleOptionClick}
      />
    </form>
  );
};

export default SearchForm;
