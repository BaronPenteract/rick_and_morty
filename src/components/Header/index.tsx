import React from "react";
import { motion } from "framer-motion";

import { ReactComponent as Rick } from "../../assets/images/rick-svgrepo-com.svg";
import { ReactComponent as Morty } from "../../assets/images/morty.svg";
import headerBGObject from "../../assets/images/header-bg.png";
import headerBGFront from "../../assets/images/header_bg_front.png";
import headerBGBack from "../../assets/images/header_bg_back.jpg";
import { Link } from "react-router-dom";
import { rootPath } from "../../utils/constants";

import styles from "./index.module.scss";

import {
  headerBGBackAnimation,
  headerBGFrontAnimation,
  headerBGObjectAnimation,
  headerBGObjectContainerAnimation,
} from "./animations";
import NavTab from "../NavTab";

const Header: React.FC = () => {
  const [isHeaderActive, setIsHeaderActive] = React.useState(false);

  return (
    <motion.header
      className={`${styles.root} ${isHeaderActive ? styles.root_active : ""}`}
      onMouseEnter={() => setIsHeaderActive(true)}
      onMouseLeave={() => setIsHeaderActive(false)}
      initial="hidden"
      whileHover="visible"
    >
      <div
        className={styles.headerBG}
        onMouseEnter={() => setIsHeaderActive(false)}
      >
        <motion.img
          className={styles.headerBG_back}
          src={headerBGBack}
          alt="Screaming Sun"
          variants={headerBGBackAnimation}
        />
        <motion.div
          className={styles.headerBG_objectContainer}
          variants={headerBGObjectContainerAnimation}
        >
          <motion.img
            className={styles.headerBG_object}
            src={headerBGObject}
            alt="Screaming Sun"
            variants={headerBGObjectAnimation}
          />
        </motion.div>
        <motion.img
          className={styles.headerBG_front}
          src={headerBGFront}
          alt="Screaming Sun"
          variants={headerBGFrontAnimation}
        />
      </div>
      <div className={styles.container}>
        <Link className={styles.root__link} to={rootPath + "/"}>
          <Rick className={`${styles.logo} ${styles.rick}`} />
        </Link>
        <NavTab />
        <Link className={styles.root__link} to={rootPath + "/"}>
          <Morty className={`${styles.logo} ${styles.morty}`} />
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
