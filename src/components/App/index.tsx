import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import styles from "./index.module.scss";

import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";
import Characters from "../../Pages/Characters";

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
