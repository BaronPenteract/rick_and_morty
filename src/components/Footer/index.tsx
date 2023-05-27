import React from 'react';
import ApiLink from '../ApiLink';
import styles from './index.module.scss';

const Footer: React.FC = () => {
  return <footer className={styles.root}><div className={styles.container}><ApiLink/></div></footer>;
};

export default Footer;
