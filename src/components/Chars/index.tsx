import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChars } from '../../redux/chars/charsSlice';
import { getCharsSelector } from '../../redux/chars/selectors';
import { useAppDispatch } from '../../redux/store';
import { BASE_URL } from '../../utils/constants';
import Char from '../Char';

import styles from './index.module.scss';

const Chars: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickPage = async (url: string | null) => {
    if (!url) return
    await dispatch(fetchChars(url))
  }

  React.useEffect(() => {
    dispatch(fetchChars(BASE_URL + '/character'))
      .unwrap()
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);

  const { chars, prevPage, nextPage } = useSelector(getCharsSelector);

  return (
    <div className={styles.root}>
      <ul className={styles.charsList}>
        {chars.map((char) => (
          <li key={char.id}>
            <Char {...char} />
          </li>
        ))}
      </ul>
      <button onClick={handleClickBack}>Назад</button>
      <button onClick={() => {handleClickPage(prevPage)}}>prev</button>
      <button onClick={() => {handleClickPage(nextPage)}}>next</button>
    </div>
  );
};

export default Chars;
