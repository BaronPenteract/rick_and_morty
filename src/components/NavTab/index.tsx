import React, { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";

import { rootPath } from "../../utils/constants";
import { navItems } from "../../utils/navItems";

import styles from "./index.module.scss";
import { INavItem } from "../../@types/mainComponent";
import { motion } from "framer-motion";
import { navButtonAnimation } from "./animation";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";

const NavTab: React.FC = () => {
  const navigate = useNavigate();

  const { favChars } = useSelector(getCharsSelector);

  const handleClickNav: (navItem: INavItem) => void = (navItem) => {
    navigate(navItem.to);
  };

  const navButtons: ReactElement<HTMLButtonElement>[] = [];
  navItems.forEach((item, idx) => {
    if (idx === 0) return;

    navButtons.push(
      <motion.button
        key={idx}
        className={styles.button}
        onClick={() => handleClickNav(item)}
        variants={navButtonAnimation}
        custom={idx}
      >
        <p className={styles.buttonTitle}>{item.title}</p>
        {item.title.toLocaleLowerCase() === "favorite" ? (
          <span className={styles.buttonNotify}>{favChars.length}</span>
        ) : (
          ""
        )}
      </motion.button>
    );
  });

  return (
    <motion.nav
      className={`${styles.root}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 1 }}
    >
      <div className={styles.container}>{navButtons}</div>
    </motion.nav>
  );
};

export default NavTab;
