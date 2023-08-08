import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { INavItem } from "../../@types/mainComponent";

import { navItems } from "../../utils/navItems";

import styles from "./index.module.scss";
import { useScrollAnim } from "../hooks/useScrollAnim";
import { upDownAnimation } from "../Animations";

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [hoveredNavItem, setHoveredNavItem] = React.useState(navItems[0]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { backgroundTopPosition, backgroundOpacity, mainTitleTopPosition } =
    useScrollAnim();

  const handleClickNav: (navItem: INavItem) => void = (navItem) => {
    navigate(navItem.to);
  };

  const handleHover: (navItem: INavItem) => void = (navItem) => {
    setHoveredNavItem(navItem);
  };

  const navButtons: ReactElement<HTMLButtonElement>[] = [];
  navItems.forEach((item, idx) => {
    // пропускаем первый эл емент, т.к. там объект главного экрана
    if (idx === 0) return;

    navButtons.push(
      <motion.button
        key={idx}
        className={styles.button}
        onClick={() => handleClickNav(item)}
        onMouseEnter={() => handleHover(item)}
        /* onMouseLeave={() => handleHover(navItems[0])} */
        variants={upDownAnimation}
        custom={idx + 2}
      >
        <p>
          <Link className={styles.button__link} to={item.to}>
            {item.title}
          </Link>
        </p>
      </motion.button>
    );
  });

  return (
    <motion.section
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8, once: true }}
    >
      <motion.div
        className={styles.bg}
        style={{ top: backgroundTopPosition, opacity: backgroundOpacity }}
      >
        {navItems.map((item, idx) => {
          return (
            <img
              key={idx}
              className={`${styles.bgImage} ${
                hoveredNavItem.title === item.title ? "" : styles.bgImageHidden
              }`}
              src={item.image}
              alt={item.title}
            />
          );
        })}
      </motion.div>
      <nav className={styles.nav}>{navButtons}</nav>
      <div className={styles.header}>
        <motion.h1
          className={styles.title}
          onMouseEnter={() => handleHover(navItems[0])}
          variants={upDownAnimation}
          custom={1}
          style={{ top: mainTitleTopPosition }}
        >
          {navItems[0].title}
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default Main;
