import { TActiveOptionOnClick } from "../../@types/TSearchForm";
import styles from "./index.module.scss";
import React from "react";

type TCustomOptionLiProps = {
  name: string;
  value: string;
  isActive: boolean;
  onClick: TActiveOptionOnClick;
};

const CustomOptionLi: React.FC<TCustomOptionLiProps> = ({
  name,
  value,
  isActive: isActiveProps,
  onClick,
}) => {
  const [isActive, setIsActive] = React.useState<boolean>(isActiveProps);

  React.useEffect(() => {
    setIsActive(isActiveProps);
  }, [isActiveProps]);

  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    if (isActive) {
      onClick({ name, value: "" });
    } else {
      onClick({ name, value });
    }
  };

  return (
    <li
      className={`${styles.root} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
      title={name}
    >
      {value}
    </li>
  );
};

export default CustomOptionLi;
