import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import styles from "./index.module.scss";

import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import Characters from "../../Pages/Characters";
import Character from "../../Pages/Character";
import { rootPath } from "../../utils/constants";
import Episodes from "../../Pages/Episodes";

const App: React.FC = () => {
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
            <Route path="characters" element={<Characters />} />
            <Route path="character/:id" element={<Character />} />
            <Route path="episodes" element={<Episodes />} />
          </Route>
          <Route path="*" element={<Navigate to={rootPath} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
