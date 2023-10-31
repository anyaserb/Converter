import styles from "./input.module.css";

const Input = (props) => {
  <input
    className={styles.input}
    onChange={props.onChange}
    type="number"
    value={props.value}
    onKeyDown={props.onKeyDown}
    min={0}
  />;
};

export default Input;
