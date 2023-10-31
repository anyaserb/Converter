  // const changeFirstInputHandler = (event) => {
  //   helper(
  //     converterData,
  //     event.target.value,
  //     setFirstInputHandler,
  //     firstSelectHandler,
  //     secondSelectHandler,
  //     setSecondInputHandler
  //   );
  // };

  // const helper = (
  //   data,
  //   value,
  //   setInputOne,
  //   firstSelect,
  //   secondSelect,
  //   setInputTwo
  // ) => {
  //   if (data.length > 0) {
  //     setInputOne(value);

  //     const firstCurrency = parseFloat(value);
  //     const firstCurrencyRate = converterData.find(
  //       (currency) => currency.cc === firstSelect
  //     )?.rate;
  //     const secondCurrencyRate = converterData.find(
  //       (currency) => currency.cc === secondSelect
  //     )?.rate;

  //     setInputTwo(
  //       ((firstCurrency * firstCurrencyRate) / secondCurrencyRate).toFixed(2)
  //     );
  //   }
  // };

  // const changeSecondInputHandler = (event) => {
  //   if (converterData.length > 0) {
  //     setSecondInputHandler(event.target.value);

  //     const secondCurrency = parseFloat(event.target.value);
  //     const secondCurrencyRate = converterData.find(
  //       (currency) => currency.cc === secondSelectHandler
  //     )?.rate;
  //     const firstCurrencyRate = converterData.find(
  //       (currency) => currency.cc === firstSelectHandler
  //     )?.rate;

  //     setFirstInputHandler(
  //       ((secondCurrency * secondCurrencyRate) / firstCurrencyRate).toFixed(2)
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (converterData.length > 0) {
  //     const firstCurrency = parseFloat(firstInputHandler);
  //     const firstCurrencyRate = converterData.find(
  //       (currency) => currency.cc === firstSelectHandler
  //     )?.rate;
  //     const secondCurrencyRate = converterData.find(
  //       (currency) => currency.cc === secondSelectHandler
  //     )?.rate;

  //     setSecondInputHandler(
  //       ((firstCurrency * firstCurrencyRate) / secondCurrencyRate).toFixed(2)
  //     );
  //   }
  // }, [firstSelectHandler]);

  // useEffect(() => {
  //   if (converterData.length > 0) {
  //     const secondCurrency = parseFloat(secondInputHandler);
  //     const firstCurrencyRate = converterData.find(
  //       (currency) => currency.cc === firstSelectHandler
  //     )?.rate;
  //     const secondCurrencyRate = converterData.find(
  //       (currency) => currency.cc === secondSelectHandler
  //     )?.rate;

  //     setFirstInputHandler(
  //       ((secondCurrency * secondCurrencyRate) / firstCurrencyRate).toFixed(2)
  //     );
  //   }
  // }, [secondSelectHandler]);

  // const changeFirstInputHandler = (event) => {
  //   console.log('changeFirstInputHandler')
  //   setFirstInputHandler(event.target.value)
  //   helper(
  //     converterData,
  //     event.target.value,
  //     // setFirstInputHandler,
  //     firstSelectHandler,
  //     secondSelectHandler,
  //     setSecondInputHandler
  //   );
  // };

  // const changeSecondInputHandler = (event) => {
  //   console.log('changeSecondInputHandler')
  //   setSecondInputHandler(event.target.value)

  //   helper(
  //     converterData,
  //     event.target.value,
  //     // setSecondInputHandler,
  //     secondSelectHandler,
  //     firstSelectHandler,
  //     setFirstInputHandler
  //   );
  // };

  // useEffect(() => {
  //   console.log('useEffect firstSelectHandler')

  //   helper(
  //     converterData,
  //     firstInputHandler,
  //     // setFirstInputHandler,
  //     firstSelectHandler,
  //     secondSelectHandler,
  //     setSecondInputHandler
  //   );
  // }, [firstSelectHandler]);

  // useEffect(() => {
  //   console.log('useEffect secondSelectHandler')

  //   helper(
  //     converterData,
  //     secondInputHandler,
  //     // setSecondInputHandler,
  //     secondSelectHandler,
  //     firstSelectHandler,
  //     setFirstInputHandler
  //   );
  // }, [secondSelectHandler]);