import styles from "./index.module.scss";

const Preloader: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={`${styles.dot} ${styles.anim}`} />
        <span className={`${styles.dot} ${styles.anim}`} />
        <span className={`${styles.dot} ${styles.anim}`} />
        <span className={`${styles.dot} ${styles.anim}`} />
      </div>
    </div>
  );
};

export default Preloader;
