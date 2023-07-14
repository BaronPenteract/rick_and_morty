import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { INavItem } from "../../@types/mainComponent";

import mainBG from "../../assets/images/main-bg.jpg";
import charactersBG from "../../assets/images/chars-bg.png";
import locationsBG from "../../assets/images/locs-bg.jpg";
import episodesBG from "../../assets/images/episodes-bg.jpg";

import { PROJECT_TITLE, rootPath } from "../../utils/constants";

import styles from "./index.module.scss";

const defaultNavItem: INavItem = {
  title: PROJECT_TITLE,
  to: rootPath,
  image: mainBG,
};

const navItems: INavItem[] = [
  defaultNavItem,
  { title: "Characters", to: "characters", image: charactersBG },
  { title: "Locations", to: "locations", image: locationsBG },
  { title: "Episodes", to: "episodes", image: episodesBG },
];

const upDownAnimation = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.2,
    },
  }),
};

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [hoveredNavItem, setHoveredNavItem] = React.useState(navItems[0]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickNav: (navItem: INavItem) => void = (navItem) => {
    navigate(navItem.to);
  };

  const handleHover: (navItem: INavItem) => void = (navItem) => {
    setHoveredNavItem(navItem);
  };

  const navButtons = navItems.map((item, idx) => {
    if (idx === 0) return <></>;
    return (
      <motion.button
        key={idx}
        className={styles.button}
        onClick={() => handleClickNav(item)}
        onMouseEnter={() => handleHover(item)}
        onMouseLeave={() => handleHover(navItems[0])}
        variants={upDownAnimation}
        custom={idx}
      >
        <p>{item.title}</p>
      </motion.button>
    );
  });

  return (
    <motion.section
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8 }}
    >
      {navItems.map((item, idx) => {
        return (
          <img
            key={idx}
            className={`${styles.bg} ${
              hoveredNavItem.title === item.title ? "" : styles.bgHidden
            }`}
            src={item.image}
            alt={item.title}
          />
        );
      })}
      <nav className={styles.nav}>{navButtons}</nav>
      <div className={styles.header}>
        <motion.h1
          className={styles.title}
          initial={{
            top: -100,
            opacity: 0,
          }}
          animate={{
            top: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 0.5,
          }}
        >
          {PROJECT_TITLE}
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default Main;
