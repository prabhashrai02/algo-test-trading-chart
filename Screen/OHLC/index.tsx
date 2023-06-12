import { useOhlcChart } from "./useOhlcChart";

import styles from "./ohlc.module.css";

const OHLCPage = () => {
  const { chartContainerRef } = useOhlcChart();

  return (
    <div className={styles.chartContainerWrapper}>
      <div className={styles.chartContainer} ref={chartContainerRef} />
    </div>
  );
};

export default OHLCPage;
