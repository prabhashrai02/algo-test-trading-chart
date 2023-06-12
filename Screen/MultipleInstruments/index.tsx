import { useMultipleInstruments } from "./useMultipleInstruments";

import InputDropdown from "@/Common/Components/InputDropdown";
import { STOCKS_LIST, TIME_FRAME } from "@/Common/constants";

import styles from "./multipleInstruments.module.css";
import StocksDropdown from "./StocksDropdown";

const MultipleInstruments = () => {
  const {
    chartContainerRef,
    selectedStocks,
    setSelectedStocks,
    timeFrame,
    setTimeFrame,
  } = useMultipleInstruments();

  return (
    <div className={styles.chartContainerWrapper}>
      <div className={styles.inputLineContainer}>
        <StocksDropdown
          label={"Select Stocks: "}
          options={STOCKS_LIST}
          selectedValues={selectedStocks}
          onDropdownValueChange={setSelectedStocks}
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
