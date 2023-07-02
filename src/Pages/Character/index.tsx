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

const Character: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const [char, setChar] = React.useState<CharType>();
  const [err, setErr] = React.useState<Error>(new Error("404 Not found."));

  //берем статус загрузки
  const { status } = useSelector(getCharsSelector);

  const id = Number(params.id);

  React.useEffect(() => {
    dispatch(fetchChar({ id }))
      .unwrap()
      .then((res) => {
        setChar(res);
      })
      .catch((e) => {
        setErr(new Error(e.error));
      });
  }, []);

  if (status === Status.ERROR) {
    return <ErrorBlock err={err} />;
  }

  return (
    <section className={styles.root} aria-label={char?.name}>
      {status === Status.LOADING ? <Preloader /> : <CharBigView char={char} />}
    </section>
  );
};

export default Character;
