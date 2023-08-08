import React, { ReactElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { navItems } from "../../utils/navItems";

import styles from "./index.module.scss";
import { INavItem } from "../../@types/mainComponent";
import { motion } from "framer-motion";
import { navButtonAnimation } from "./animation";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";

const NavTab: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState("");

  React.useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

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
        className={`${styles.button} ${
          item.to === currentPage ? styles.button_active : ""
        }`}
        onClick={() => handleClickNav(item)}
        variants={navButtonAnimation}
        custom={idx}
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
