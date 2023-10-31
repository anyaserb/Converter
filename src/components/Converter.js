import { useState, useEffect, useCallback } from "react";

import styles from "./Converter.module.css";
import imageMoney from "../assets/image 1.png";
import SvgComponent from "./UI/SvgButton";
import Dropdown from "./Dropdown";
import ErrorModal from "./UI/ErrorModal";

const Converter = () => {
  const [converterData, setConverterData] = useState([]);
  const [firstInputHandler, setFirstInputHandler] = useState(100);
  const [firstSelectHandler, setFirstSelectHandler] = useState("");
  const [secondInputHandler, setSecondInputHandler] = useState(0);
  const [secondSelectHandler, setSecondSelectHandler] = useState("");

  const [courseFirst, setCourseFirst] = useState("");
  const [courseSecond, setCourseSecond] = useState("");

  const [isActiveDropdownFirst, setIsActiveDropdownFirst] = useState(false);
  const [isActiveDropdownSecond, setIsActiveDropdownSecond] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
        );
        const data = await response.json();

        const currencyData = data.map((currencyData) => ({
          key: currencyData.r030,
          txt: currencyData.txt,
          rate: currencyData.rate,
          cc: currencyData.cc
        }));
        setConverterData(currencyData);
      } catch (error) {
        setError("Помилка при завантаженні даних. Спробуйте, будь ласка, пізніше.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (converterData.length > 0) {
      setFirstSelectHandler(
        converterData[
          converterData.findIndex((currency) => currency.cc === "EUR")
        ].cc
      );
      setSecondSelectHandler(
        converterData[
          converterData.findIndex((currency) => currency.cc === "USD")
        ].cc
      );
    }
  }, [converterData]);

  useEffect(() => {
    if (secondSelectHandler !== "" && firstSelectHandler !== "") {
      const indexFirst = converterData.findIndex(
        (item) => item.cc === firstSelectHandler
      );
      const indexSecond = converterData.findIndex(
        (item) => item.cc === secondSelectHandler
      );
      setCourseFirst(
        `1 ${firstSelectHandler} = ${(
          converterData[indexFirst].rate / converterData[indexSecond].rate
        ).toFixed(4)} ${secondSelectHandler}`
      );
      setCourseSecond(
        `1 ${secondSelectHandler} = ${(
          converterData[indexSecond].rate / converterData[indexFirst].rate
        ).toFixed(4)} ${firstSelectHandler}`
      );
    }
  }, [firstSelectHandler, secondSelectHandler]);

  const changeCurrencyHandler = (event) => {
    event.preventDefault();

    const firstInput = firstInputHandler;
    const firstSelector = firstSelectHandler;

    setFirstInputHandler(secondInputHandler);
    setSecondInputHandler(firstInput);
    setFirstSelectHandler(secondSelectHandler);
    setSecondSelectHandler(firstSelector);
  };

  const changeFirstInputHandler = useCallback((event) => {
    if (!event.target || event.target.value.startsWith("0")) {
      return;
    } else if (converterData.length > 0) {
      setFirstInputHandler(event.target.value);

      const firstCurrency = parseFloat(event.target.value);
      const firstCurrencyRate = converterData.find(
        (currency) => currency.cc === firstSelectHandler
      )?.rate;
      const secondCurrencyRate = converterData.find(
        (currency) => currency.cc === secondSelectHandler
      )?.rate;

      setSecondInputHandler(
        ((firstCurrency * firstCurrencyRate) / secondCurrencyRate).toFixed(2)
      );
    }
  });

  const changeSecondInputHandler = useCallback((event) => {
    if (!event.target || event.target.value.startsWith("0")) {
      return;
    } else if (converterData.length > 0) {
      setSecondInputHandler(event.target.value);

      const secondCurrency = parseFloat(event.target.value);
      const secondCurrencyRate = converterData.find(
        (currency) => currency.cc === secondSelectHandler
      )?.rate;
      const firstCurrencyRate = converterData.find(
        (currency) => currency.cc === firstSelectHandler
      )?.rate;

      setFirstInputHandler(
        ((secondCurrency * secondCurrencyRate) / firstCurrencyRate).toFixed(2)
      );
    }
  });

  useEffect(() => {
    if (converterData.length > 0 && firstInputHandler > 0) {
      const firstCurrency = parseFloat(firstInputHandler);
      const firstCurrencyRate = converterData.find(
        (currency) => currency.cc === firstSelectHandler
      )?.rate;
      const secondCurrencyRate = converterData.find(
        (currency) => currency.cc === secondSelectHandler
      )?.rate;

      setSecondInputHandler(
        ((firstCurrency * firstCurrencyRate) / secondCurrencyRate).toFixed(2)
      );
    }
  }, [firstSelectHandler]);

  useEffect(() => {
    if (converterData.length > 0 && secondInputHandler > 0) {
      const secondCurrency = parseFloat(secondInputHandler);
      const firstCurrencyRate = converterData.find(
        (currency) => currency.cc === firstSelectHandler
      )?.rate;
      const secondCurrencyRate = converterData.find(
        (currency) => currency.cc === secondSelectHandler
      )?.rate;

      setFirstInputHandler(
        ((secondCurrency * secondCurrencyRate) / firstCurrencyRate).toFixed(2)
      );
    }
  }, [secondSelectHandler]);

  const closeDropdownHandler = () => {
    if (isActiveDropdownFirst) {
      setIsActiveDropdownFirst(!isActiveDropdownFirst);
    }
    if (isActiveDropdownSecond) {
      setIsActiveDropdownSecond(!isActiveDropdownSecond);
    }
  };

  const inputKeyHandler = (event) => {
    if (event.keyCode === 189 || event.keyCode === 69) {
      event.preventDefault();
    }
  };

  return (
    <form className={styles.conteiner} onClick={closeDropdownHandler}>
      {error && (
        <ErrorModal
          title={error.title}
          message={error}
        />
      )}
      <div>
        <img className={styles.imageMoney} src={imageMoney} alt="Money" />
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          onChange={changeFirstInputHandler}
          type="number"
          value={firstInputHandler}
          onKeyDown={inputKeyHandler}
          min={0}
        />
        <div className={styles.course}>{courseFirst}</div>
        <Dropdown
          data={converterData}
          selected={firstSelectHandler}
          setSelected={setFirstSelectHandler}
          isActive={isActiveDropdownFirst}
          setIsActive={setIsActiveDropdownFirst}
        />
      </div>
      <button className={styles.button} onClick={changeCurrencyHandler}>
        <SvgComponent />
      </button>
      <div className={styles.item}>
        <input
          className={styles.input}
          type="number"
          value={secondInputHandler}
          onChange={changeSecondInputHandler}
          onKeyDown={inputKeyHandler}
          min={0}
        />
        <div className={styles.course}>{courseSecond}</div>
        <Dropdown
          data={converterData}
          selected={secondSelectHandler}
          setSelected={setSecondSelectHandler}
          isActive={isActiveDropdownSecond}
          setIsActive={setIsActiveDropdownSecond}
        />
      </div>
    </form>
  );
};

export default Converter;
