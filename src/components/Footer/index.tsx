import React from "react";

import { motion, Variants } from "framer-motion";

import ApiLink from "../ApiLink";
import styles from "./index.module.scss";
import GitHubLink from "../GitHubLink";
import { PROJECT_TITLE, rootPath } from "../../utils/constants";
import { Link } from "react-router-dom";

const footerAnimation: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 1,
    transition: {
      ease: "linear",
      duration: 2.5,
      type: "tween",
    },
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Footer: React.FC = () => {
  return (
    <motion.footer
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.6 }}
    >
      <div className={styles.container}>
        <div className={styles.content}>{PROJECT_TITLE}</div>
        <div className={styles.info}>
          <ApiLink />
          <GitHubLink />
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
