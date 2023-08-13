import { ReactElement } from "react";
import styles from "./index.module.scss";
import React from "react";
import CustomOptionLi from "../CustomOptionLi";
import { TActiveOption, TActiveOptionOnClick } from "../../@types/TSearchForm";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type TCustomSelectorProps = {
  name: string;
  values: string[];
  selectedValue: string;
  onOptionClick: TActiveOptionOnClick;
  setActiveOptions: React.Dispatch<React.SetStateAction<TActiveOption[]>>;
};

const CustomSelector: React.FC<TCustomSelectorProps> = ({
  name,
  values,
  selectedValue,
  onOptionClick,
  setActiveOptions,
}) => {
  const [selectedValueState, setSelectedValueState] = React.useState<string>(
    selectedValue || ""
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const handleOptionClick: TActiveOptionOnClick = ({ name, value }) => {
    setSelectedValueState(value);
    onOptionClick({ name, value });

    setActiveOptions((prev) => {
      const currentSelectorOption = prev.find((item) => item.name === name);

      if (!currentSelectorOption) {
        return [
          ...prev,
          {
            name,
            value,
            onClick: ({ name, value }) => {
              handleOptionClick({ name, value: "" });
            },
          },
        ];
      }

      const newState: TActiveOption[] = [];

      prev.forEach((item) => {
        if (item.name === name) {
          if (value) {
            item.value = value;
            newState.push(item);
          }
        } else {
          newState.push(item);
        }
      });

      return newState;
    });
  };

  React.useEffect(() => {
    if (location.search) {
      const searchValue: string = searchParams.get(name) || "";

      setActiveOptions((prev) => {
        const currentSelectorOption = prev.find((item) => item.name === name);

        if (!currentSelectorOption) {
          return [
            ...prev,
            {
              name,
              value: searchValue,
              onClick: ({ name, value }) => {
                handleOptionClick({ name, value: "" });
              },
            },
          ];
        }

        const newState: TActiveOption[] = [];

        prev.forEach((item) => {
          if (item.name === name) {
            if (searchValue.length) {
              item.value = searchValue;
              newState.push(item);
            }
          } else {
            newState.push(item);
          }
        });

        return newState;
      });
    } else {
      setActiveOptions([]);
    }
  }, [location.search, navigate]);

  React.useEffect(() => {
    setSelectedValueState(selectedValue);
  }, [selectedValue]);

  const options: ReactElement<HTMLOptionElement>[] = [
    <option
      key={0}
      value={""}
      onClick={(e) => handleOptionClick({ name, value: "" })}
    >
      all
    </option>,
  ];

  const optionLIs: ReactElement<HTMLLIElement>[] = [];

  values.forEach((value, idx) => {
    options.push(
      <option
        key={value + idx}
        value={value}
        /* selected={value === selectedValueState} */
        onClick={() => handleOptionClick({ name, value })}
      >
        {value}
      </option>
    );
    optionLIs.push(
      <CustomOptionLi
        key={value + idx}
        name={name}
        value={value}
        isActive={value === selectedValueState}
        onClick={handleOptionClick}
      />
    );
  });

  return (
    <div className={`${styles.root}`}>
      <h3>{name}</h3>
      <select name={name} hidden={true}>
        {options}
      </select>
      <ul className={`${styles.select}`}>{optionLIs}</ul>
    </div>
  );
};

export default CustomSelector;
