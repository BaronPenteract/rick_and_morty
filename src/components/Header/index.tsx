import React from "react";
import { Variants, motion } from "framer-motion";

import { ReactComponent as Logo } from "../../assets/images/rick-svgrepo-com.svg";
import headerBGObject from "../../assets/images/header-bg.png";
import headerBGFront from "../../assets/images/header_bg_front.png";
import headerBGBack from "../../assets/images/header_bg_back.jpg";
import { Link } from "react-router-dom";
import { rootPath } from "../../utils/constants";

import styles from "./index.module.scss";

const headerBGFrontAnimation: Variants = {
  hidden: {
    bottom: "-100%",
    transition: {
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
      delay: 1.5,
    },
  },
  visible: {
    bottom: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
      type: "tween",
      delay: 0.5,
    },
  },
};
const headerBGObjectAnimation: Variants = {
  hidden: {
    bottom: "-100%",
    transition: {
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
      delay: 1.75,
    },
  },
  visible: {
    bottom: "70%",
    transition: {
      ease: "easeOut",
      duration: 4.5,
      type: "tween",
      delay: 1.25,
    },
  },
};
const headerBGBackAnimation: Variants = {
  hidden: {
    top: "100%",
    transition: {
      ease: "easeOut",
      duration: 0.5,
      type: "tween",
      delay: 1.25,
    },
  },
  visible: {
    top: "10%",
    transition: {
      ease: "easeOut",
      duration: 1.5,
      type: "tween",
      delay: 0.75,
    },
  },
};

const Header: React.FC = () => {
  const [isHeaderActive, setIsHeaderActive] = React.useState(false);

  const toggleIsHeaderActive = () => {
    setIsHeaderActive(!isHeaderActive);
  };

  return (
    <motion.header
      className={`${styles.root} ${isHeaderActive ? styles.root_active : ""}`}
      onMouseEnter={toggleIsHeaderActive}
      onMouseLeave={toggleIsHeaderActive}
      initial="hidden"
      whileHover="visible"
      viewport={{ amount: 0.6 }}
    >
      <div className={styles.headerBG}>
        <motion.img
          className={styles.headerBG_back}
          src={headerBGBack}
          alt="Screaming Sun"
          variants={headerBGBackAnimation}
        />
        <motion.img
          className={styles.headerBG_object}
          src={headerBGObject}
          alt="Screaming Sun"
          variants={headerBGObjectAnimation}
        />
        <motion.img
          className={styles.headerBG_front}
          src={headerBGFront}
          alt="Screaming Sun"
          variants={headerBGFrontAnimation}
        />
      </div>
      <div className={styles.container}>
        <Link to={rootPath + "/"}>
          <Logo className={styles.logo} />
        </Link>
        <nav
          className={`${styles.nav} ${isHeaderActive ? styles.nav_active : ""}`}
        >
          <Link to={rootPath + "/characters"}>characters</Link>
          <Link to={rootPath + "/favorite-characters"}>favoriteChars</Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
