import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";
import CharList from "../../components/CharList";
import { CharType } from "../../@types/chars";
import { PROJECT_TITLE } from "../../utils/constants";

const FavoriteCharactersPage: React.FC = () => {
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));
  const [chars, setChars] = React.useState<CharType[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { favChars } = useSelector(getCharsSelector);

  React.useEffect(() => {
    if (!favChars.length) {
      // Здессь будет добавленияе из локального хранилища
      //dispatch());
    }
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
