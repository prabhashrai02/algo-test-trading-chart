import { useLivePriceChart } from "./useLivePriceChart";

import styles from "./livePrice.module.css";

const LivePrice = () => {
  const { chartContainerRef } = useLivePriceChart();

  return <div className={styles.chartContainer} ref={chartContainerRef} />;
};

export default LivePrice;
