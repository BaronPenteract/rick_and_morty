import React, { KeyboardEventHandler, ReactNode } from "react";
import styles from "./index.module.scss";

type TModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

const Modal: React.FC<TModalProps> = ({ isOpen, setIsOpen, children }) => {
  // При открытии модалки блокируем прокрутку боди и навешиваем слушателя на нажатие, при закрытии все убираем
  React.useEffect(() => {
    const handleCloseKeyESC: (
      this: GlobalEventHandlers,
      ev: KeyboardEvent
    ) => any = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.onkeydown = handleCloseKeyESC;
    } else {
      document.body.style.overflow = "visible";
      document.onkeydown = null;
    }
  }, [isOpen]);

  const handleCloseClick: React.MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${styles.root} ${isOpen ? styles.rootActive : ""}`}
      onClick={handleCloseClick}
    >
      {children}
    </div>
  );
};

export default Modal;
