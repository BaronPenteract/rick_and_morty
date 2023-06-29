import styles from "./index.module.scss";

type TPreloaderProps = {
  className?: string;
};

const Preloader: React.FC<TPreloaderProps> = ({ className }) => {
  return (
    <div className={`${styles.root} ${className}`}>
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
