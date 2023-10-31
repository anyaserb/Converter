import styles from "./ErrorModal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop}></div>;
};

const Overlay = (props) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h1>{"Упс! Помилка :("}</h1>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}></footer>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay message={props.message} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ErrorModal;
