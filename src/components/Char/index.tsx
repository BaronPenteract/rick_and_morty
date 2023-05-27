import { CharType } from '../../@types/chars';

import styles from './index.module.scss';
import buttonStyles from '../../utils/styles/button.module.scss';
import React from 'react';

const Char: React.FC<CharType> = ({
  id,
  name,
  image,
  gender,
  species,
  status,
  origin,
  location,
  episode,
}) => {
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  const handleClickInfoOpen = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const genderSymbol = (gender: string): JSX.Element => {
    if (gender === 'Male') {
      return <>&#9794; {gender}</>;
    }

    if (gender === 'Female') {
      return <>&#9792; {gender}</>;
    }

    return <>{gender}</>;
  };

  return (
    <article>
      <div className={`${styles.root} ${isInfoOpen ? styles.rootActive : ''}`}>
        <img className={styles.imageBG} src={image} alt={name} />
        <img className={styles.avatar} src={image} alt={name} />
        <div className={styles.header}>
          <h2 className={styles.name}>{name}</h2>
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{name}</p>
          <ul className={styles.contentFooter}>
            <li>
              Origin: <span>{origin.name}</span>
            </li>
            <li>
              Last known location: <span>{location.name}</span>
            </li>
            <li>
              First seen in:: <span>{episode[0]}</span>
            </li>
            <li>
              Episodes: <span>{episode.length}</span>
            </li>
          </ul>
        </div>
        <div className={styles.footer}>
          <p>
            sex: <span className={styles.gender}>{genderSymbol(gender)}</span>
          </p>
          <p>
            species: <span>{species}</span>
          </p>
          <p>
            status: <span className={styles[status]}>{status}</span>
          </p>
        </div>
        <button
          className={`${buttonStyles.buttonMoreInfo} ${styles.button}`}
          onClick={handleClickInfoOpen}
        >
          <span className={styles.buttonLine}></span>
        </button>
      </div>
    </article>
  );
};

export default Char;
