import { useOhlcChart } from "./useOhlcChart";

import InputDropdown from "@/Common/Components/InputDropdown";
import { STOCKS_LIST, TIME_FRAME } from "@/Common/constants";

import styles from "./ohlc.module.css";

const OHLCPage = () => {
  const {
    chartContainerRef,
    selectStock,
    setSelectStock,
    timeFrame,
    setTimeFrame
  } = useOhlcChart();

  return (
    <div className={styles.chartContainerWrapper}>
    <div className={styles.inputLineContainer}>
      <InputDropdown
        label={"Choose Stock: "}
        options={STOCKS_LIST}
        onDropdownValueChange={(value) => setSelectStock(value)}
        selectedValue={selectStock}
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

export default OHLCPage;
