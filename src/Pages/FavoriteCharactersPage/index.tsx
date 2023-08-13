import React from "react";
import { useSelector } from "react-redux";
import { getCharsSelector } from "../../redux/chars/selectors";

import styles from "./index.module.scss";
import CharList from "../../components/CharList";
import { CharType } from "../../@types/chars";
import { PROJECT_TITLE } from "../../utils/constants";

const FavoriteCharactersPage: React.FC = () => {
  const [chars, setChars] = React.useState<CharType[]>([]);

  const { favChars } = useSelector(getCharsSelector);

  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    setChars(favChars);
  }, [favChars]);

  return (
    <section
      className={styles.root}
      aria-label={`My favorite characters of ${PROJECT_TITLE}`}
    >
      <h1
        className={styles.root__title}
      >{`My favorite characters of ${PROJECT_TITLE}`}</h1>
      <CharList chars={chars} />
    </section>
  );
};

export default FavoriteCharactersPage;
