import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCurrency, setFilteredCurrency] = useState();

  const changeInputHandler = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (inputValue.trim().length < 0) {
      setFilteredCurrency(props.data);
    } else {
      setFilteredCurrency(
        props.data.filter(
          (currency) =>
            currency.txt.toLowerCase().includes(inputValue) ||
            currency.cc.toLowerCase().includes(inputValue) ||
            currency.txt.toUpperCase().includes(inputValue) ||
            currency.cc.toUpperCase().includes(inputValue)
        )
      );
    }

    console.log(props.data);
  }, [inputValue, props.data]);

  const clickDropdownHandler = (e) => {
      props.setIsActive(!props.isActive);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.btn} onClick={clickDropdownHandler}>
        {props.selected}
        <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
      </div>
      {props.isActive && (
        <div className={styles.content}>
          <div className={styles.findCurrency}>
            <input
              type="text"
              placeholder="Почніть пошук валюти"
              onChange={changeInputHandler}
              value={inputValue}
              onClick={stopPropagation}
            />
          </div>

          {filteredCurrency.map((currency) => (
            <div
              onClick={() => {
                props.setSelected(currency.cc);
                props.setIsActive(false);
              }}
              className={styles.item}
              key={currency.key}
            >
              {currency.cc} {currency.txt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
