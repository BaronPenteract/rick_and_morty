import { ReactElement } from "react";
import styles from "./index.module.scss";
import React from "react";
import { IFilterParamsChars } from "../../@types/chars";
import { IFilterParamsEpisodes } from "../../@types/episodes";
import { ECharGender, ECharStatus, Status } from "../../utils/constants";
import CustomSelector from "../CustomSelector";
import { TActiveOption, TActiveOptionOnClick } from "../../@types/TSearchForm";
import Preloader from "../Preloader";
import CustomOptionLi from "../CustomOptionLi";

type TCustomSelectorsBurgerProps = {
  filterCharsParams?: IFilterParamsChars;
  filterEpisodesParams?: IFilterParamsEpisodes;
  status: Status;
  onOptionClick: TActiveOptionOnClick;
};

const CustomSelectorsBurger: React.FC<TCustomSelectorsBurgerProps> = ({
  filterCharsParams,
  filterEpisodesParams,
  status,
  onOptionClick,
}) => {
  const [isBurgerActive, setIsBurgerActive] = React.useState<boolean>(false);
  const [activeOptions, setActiveOptions] = React.useState<TActiveOption[]>([]);

  const selectors: ReactElement<HTMLSelectElement>[] = [];

  // Проверяем, если пришел фильтр персов, то добавляем селекторы
  if (filterCharsParams)
    selectors.push(
      <CustomSelector
        key={"gender"}
        name="gender"
        values={Object.values(ECharGender)}
        selectedValue={filterCharsParams.gender || ""}
        onOptionClick={onOptionClick}
        setActiveOptions={setActiveOptions}
      />,
      <CustomSelector
        key="status"
        name="status"
        values={Object.values(ECharStatus)}
        selectedValue={filterCharsParams.status || ""}
        onOptionClick={onOptionClick}
        setActiveOptions={setActiveOptions}
      />
    );

  return (
    <div
      className={`${styles.root}`}
      onClick={isBurgerActive ? () => setIsBurgerActive(false) : undefined}
    >
      {activeOptions.length ? (
        <ul className={styles.list}>
          {activeOptions.map((item, idx) => {
            if (item.value) {
              return (
                <CustomOptionLi
                  key={idx}
                  name={item.name}
                  value={item.value}
                  isActive={true}
                  onClick={item.onClick}
                />
              );
            }
          })}
        </ul>
      ) : (
        ""
      )}
      <button
        className={`${styles.button}`}
        type="button"
        disabled={status === Status.LOADING}
        onClick={() => setIsBurgerActive(!isBurgerActive)}
      >
        {status === Status.LOADING ? <Preloader /> : <span>&#926; Filter</span>}
      </button>
      <div
        className={`${styles.selectors} ${
          isBurgerActive ? styles.selectors_active : ""
        }`}
      >
        {selectors}
      </div>
    </div>
  );
};

export default CustomSelectorsBurger;
