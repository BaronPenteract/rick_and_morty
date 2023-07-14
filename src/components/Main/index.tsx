import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { INavItem } from "../../@types/mainComponent";

import mainBG from "../../assets/images/main-bg.jpg";
import charactersBG from "../../assets/images/chars-bg.png";
import locationsBG from "../../assets/images/locs-bg.jpg";
import episodesBG from "../../assets/images/episodes-bg.jpg";

import { rootPath } from "../../utils/constants";

import styles from "./index.module.scss";

const defaultNavItem: INavItem = {
  title: "Rick and Morty Explorer",
  to: rootPath,
  image: mainBG,
};

const navItems: INavItem[] = [
  defaultNavItem,
  { title: "Characters", to: "characters", image: charactersBG },
  { title: "Locations", to: "locations", image: locationsBG },
  { title: "Episodes", to: "episodes", image: episodesBG },
];

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [hoveredNavItem, setHoveredNavItem] = React.useState(navItems[0]);

  const handleClickNav: (navItem: INavItem) => void = (navItem) => {
    navigate(navItem.to);
  };

  const handleHover: (navItem: INavItem) => void = (navItem) => {
    setHoveredNavItem(navItem);
  };

  return (
    <section className={styles.root}>
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
      <motion.nav
        className={styles.nav}
        initial={{ top: -100, opacity: 0 }}
        animate={{
          top: 0,
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
      >
        {navItems.map((item, idx) => {
          if (idx === 0) return <></>;
          return (
            <button
              key={idx}
              className={styles.button}
              onClick={() => handleClickNav(item)}
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={() => handleHover(navItems[0])}
            >
              <p>{item.title}</p>
            </button>
          );
        })}
      </motion.nav>
      <div className={styles.header}>
        <h1 className={styles.title}>Rick and Morty Explorer</h1>
      </div>
    </section>
  );
};

export default Main;
