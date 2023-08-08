import React, { ReactElement } from "react";

import ApiLink from "../ApiLink";
import styles from "./index.module.scss";
import GitHubLink from "../GitHubLink";
import { PROJECT_TITLE, rootPath } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { INavItem } from "../../@types/mainComponent";
import { getCharsSelector } from "../../redux/chars/selectors";
import { navItems } from "../../utils/navItems";
import { navButtonAnimation } from "../NavTab/animation";
import { getEpisodesSelector } from "../../redux/episodes/selectors";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const { favChars, charsCount } = useSelector(getCharsSelector);
  const { episodesCount } = useSelector(getEpisodesSelector);

  const handleClickNav: (navItem: INavItem) => void = (navItem) => {
    navigate(navItem.to);
  };

  const navButtons: ReactElement<HTMLButtonElement>[] = [];
  navItems.forEach((item, idx) => {
    if (idx === 0) return;

    navButtons.push(
      <li>
        <button
          key={idx}
          className={styles.button}
          onClick={() => handleClickNav(item)}
        >
          <Link className={styles.buttonTitle} to={item.to}>
            {item.title}
          </Link>
          {item.title.toLocaleLowerCase() === "favorite" &&
          favChars.length > 0 ? (
            <span className={styles.buttonNotify}>{favChars.length}</span>
          ) : (
            ""
          )}
        </button>
      </li>
    );
  });

  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}>
          <nav className={`${styles.nav}`}>
            <h3 className={styles.nav__title}>Navigation</h3>
            <ul className={styles.nav__list}>{navButtons}</ul>
          </nav>
          <div className={styles.info}>
            <h3 className={styles.info__title}>Statistic</h3>
            <ul className={styles.info__list}>
              <li>
                <span>Total characters: </span>
                <span>{charsCount}</span>
              </li>
              <li>
                <span>Total episodes: </span>
                <span>{episodesCount}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.contact}>
          <ApiLink />
          <GitHubLink />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
