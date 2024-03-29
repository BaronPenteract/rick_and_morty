import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import styles from "./index.module.scss";

import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import CharactersPage from "../../Pages/CharactersPage";
import CharacterPage from "../../Pages/CharacterPage";
import { rootPath } from "../../utils/constants";
import EpisodesPage from "../../Pages/EpisodesPage";
import EpisodePage from "../../Pages/EpisodePage";
import FavoriteCharactersPage from "../../Pages/FavoriteCharactersPage";

import { useAppDispatch } from "../../redux/store";
import { fetchChars, setFavChars } from "../../redux/chars/charsSlice";
import { fetchEpisodes } from "../../redux/episodes/episodesSlice";
import { getFavCharsFromLS } from "../../utils/localStorage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Проверяем LocalStorage

  React.useEffect(() => {
    const favCharsLS = getFavCharsFromLS();

    if (favCharsLS.length) {
      dispatch(setFavChars(favCharsLS));
    }
  }, []);

  // Получаем общее число персов и эпизодов и сохраняем в store
  React.useEffect(() => {
    dispatch(fetchChars({}));
    dispatch(fetchEpisodes({}));
  }, []);

  return (
    <div className={styles.root}>
      <Routes>
        <Route path={rootPath} element={<></>} />
        <Route path="*" element={<Header />} />
      </Routes>
      <main className={styles.content}>
        <Routes>
          <Route path={rootPath}>
            <Route index element={<Main />} />
            <Route path="characters" element={<CharactersPage />} />
            <Route path="character/:id" element={<CharacterPage />} />
            <Route path="episodes" element={<EpisodesPage />} />
            <Route path="episode/:id" element={<EpisodePage />} />
            <Route
              path="favorite-characters"
              element={<FavoriteCharactersPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to={rootPath} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
