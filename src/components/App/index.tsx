import React from 'react';

import styles from './index.module.scss';

import Footer from '../Footer';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
