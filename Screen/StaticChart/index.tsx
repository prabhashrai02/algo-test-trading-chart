import { useStaticChart } from "./useStaticChart";

import styles from "./staticChart.module.css";


const ChartPage = () => {

  const { chartContainerRef } = useStaticChart();

  return <div className={styles.chartContainer} ref={chartContainerRef} />;
};

export default ChartPage;
