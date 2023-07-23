import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { rootPath } from "../../utils/constants";
import { navItems } from "../../utils/navItems";

import styles from "./index.module.scss";
import { INavItem } from "../../@types/mainComponent";
import Burger from "../Burger";
import { motion } from "framer-motion";
import { navButtonAnimation } from "./animation";

const NavTab: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const _e = e as KeyboardEvent;

      if (_e.key === "Escape") {
        setIsBurgerActive(false);
      }
    };

    window.onresize = () => {
      setIsBurgerActive(false);
    };

    document.addEventListener("keydown", handleClickOutside);

    return () => {
      window.onresize = null;
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, []);

  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  const handleClickNav: (navItem: INavItem) => void = (navItem) => {
    setIsBurgerActive(false);
    navigate(navItem.to);
  };

  const closeByOverlay: React.MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      setIsBurgerActive(false);
    }
  };

  const navButtons = navItems.map((item, idx) => {
    //if (idx === 0) return <></>;
    return (
      <motion.button
        key={idx}
        className={styles.button}
        onClick={() => handleClickNav(item)}
        variants={navButtonAnimation}
        custom={idx}
      >
        <p>{item.title}</p>
      </motion.button>
    );
  });

  return (
    <>
      <motion.nav
        className={`${styles.root} ${isBurgerActive ? styles.root_active : ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 1 }}
        onClick={closeByOverlay}
      >
        {navButtons}
      </motion.nav>
      <Burger
        isBurgerActive={isBurgerActive}
        setIsBurgerActive={setIsBurgerActive}
      />
    </>
  );
};

export default NavTab;
