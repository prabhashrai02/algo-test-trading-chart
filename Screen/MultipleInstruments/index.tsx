import { useMultipleInstruments } from "./useMultipleInstruments";

import styles from "./multipleInstruments.module.css";

const MultipleInstruments = () => {
    const { chartContainerRef } = useMultipleInstruments();

  return (
    <div className={styles.chartContainerWrapper}>
      <div className={styles.chartContainer} ref={chartContainerRef} />
    </div>
  );
};

export default MultipleInstruments;
