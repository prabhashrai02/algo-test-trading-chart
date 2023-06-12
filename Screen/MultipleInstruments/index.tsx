import { useMultipleInstruments } from "./useMultipleInstruments";

import InputDropdown from "@/Common/Components/InputDropdown";

import { STOCKS_LIST, TIME_FRAME } from "./constants";

import styles from "./multipleInstruments.module.css";

const MultipleInstruments = () => {
  const {
    chartContainerRef,
    selectFirstStock,
    setSelectFirstStock,
    selectSecondStock,
    setSelectSecondStock,
    timeFrame,
    setTimeFrame,
  } = useMultipleInstruments();

  return (
    <div className={styles.chartContainerWrapper}>
      <div className={styles.inputLineContainer}>
        <InputDropdown
          label={"Choose Stock 1: "}
          options={STOCKS_LIST}
          onDropdownValueChange={(value) => setSelectFirstStock(value)}
          selectedValue={selectFirstStock}
        />
        <InputDropdown
          label={"Choose Stock 2: "}
          options={STOCKS_LIST}
          onDropdownValueChange={(value) => setSelectSecondStock(value)}
          selectedValue={selectSecondStock}
        />
        <InputDropdown
          label={"Select Time Frame: "}
          options={TIME_FRAME}
          onDropdownValueChange={(value) => setTimeFrame(value)}
          selectedValue={timeFrame}
        />
      </div>
      <div className={styles.chartContainer} ref={chartContainerRef} />
    </div>
  );
};

export default MultipleInstruments;
