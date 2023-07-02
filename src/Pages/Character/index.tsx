import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChar } from "../../redux/chars/charsSlice";
import { getCharsSelector } from "../../redux/chars/selectors";
import { useAppDispatch } from "../../redux/store";

import styles from "./index.module.scss";

import Preloader from "../../components/Preloader";
import { Status } from "../../redux/chars/charsSlice";
import ErrorBlock from "../../components/ErrorBlock";
import { CharType } from "../../@types/chars";
import CharBigView from "../../components/CharBigView";
import CharFooter from "../../components/CharFooter";

const Character: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const [char, setChar] = React.useState<CharType>();
  const [isAdded, setIsAdded] = React.useState(false);
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));

  //берем статус загрузки
  const fetchStatus = useSelector(getCharsSelector).status;

  const charId = Number(params.id);

  React.useEffect(() => {
    dispatch(fetchChar({ id: charId }))
      .unwrap()
      .then((res) => {
        setChar(res);
      })
      .catch((e) => {
        setErr(new Error(e.error));
      });
  }, []);

  if (fetchStatus === Status.ERROR) {
    return <ErrorBlock err={err} />;
  }
  if (fetchStatus === Status.LOADING || !char) {
    return <Preloader />;
  }

  const {
    id,
    name,
    image,
    gender,
    type,
    species,
    status,
    origin,
    location,
    episode,
    url,
  } = char;

  const handleBackClick: React.MouseEventHandler = (e) => {
    navigate(-1);
  };

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackClick}>
          Back
        </button>
        <img className={styles.avatar} src={image} alt={name} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <div className={styles.avatar}>
            <img src={image} alt={name} />
            <span
              className={`${styles.status} ${styles[status]}`}
              title={`${
                gender === "Male" ? "He" : gender === "Female" ? "She" : "It"
              } is ${status}`}
            >
              {status}
            </span>
          </div>
          <h1 className={styles.name} title="Name">
            {name}
          </h1>
          <p className={styles.subTitle}>
            <span title="Gender" className={styles.gender}>
              {gender}
            </span>
            <span title="Species">{species}</span>
          </p>
        </div>
        <ul className={styles.info}>
          <li>
            Origin: <span title="Origin">{origin.name}</span>
          </li>
          <li>
            Last known location:
            <span title="Last known location">{location.name}</span>
          </li>
          {type ? (
            <li>
              Type:
              <span title="Type">{type}</span>
            </li>
          ) : (
            ""
          )}
        </ul>
        <ul className={styles.contentFooter}>
          <li>
            First seen in: <span title="First seen in">episode name</span>
          </li>
          <li>
            Episodes: <span title="Number of episodes">{episode.length}</span>
          </li>
        </ul>
      </div>
      <ul className={styles.episodes}>
        {episode.map((episode, idx) => (
          <li key={idx}>{idx}</li>
        ))}
      </ul>
    </section>
  );
};

export default Character;
