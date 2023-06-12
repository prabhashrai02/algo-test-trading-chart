import React, { useEffect, useRef } from "react";

import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

import { ChartDataType, convertToOHLC } from "@/Common/convertToOhlc";

import importedData from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";

import styles from "./ohlc.module.css";

const OHLCPage = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const data: ChartDataType[] = importedData.map(
    ([timestamp, ltp, totalVolume]) => [
      String(timestamp),
      Number(ltp),
      Number(totalVolume),
    ]
  );

  const ohlc1min = convertToOHLC(data, 15);

  const formattedData: CandlestickFormatData[] = ohlc1min.map((value) => ({
    time: (new Date(value.time).getTime() / 1000) as UTCTimestamp,
    open: value.open,
    high: value.high,
    low: value.low,
    close: value.close,
  }));

  let prevData: CandlestickFormatData;
  let currentIndex = 0;

  useEffect(() => {
    if (chartContainerRef.current) {
      if (chartInstanceRef.current === null) {
        const chart = createChart(chartContainerRef.current, {
          rightPriceScale: { visible: true },
          timeScale: { timeVisible: true, secondsVisible: true },
        });
        chartInstanceRef.current = chart;

        const candlestickSeries = chart.addCandlestickSeries({
          upColor: "green",
          downColor: "red",
          borderVisible: false,
        });
        seriesInstanceRef.current = candlestickSeries;
      }

      const addDataPoint = () => {
        const currentIndexCopy = currentIndex;
        const dataPoint = formattedData[currentIndexCopy];

        if (prevData && prevData.time > dataPoint.time)
          dataPoint.time = (prevData.time + 1) as UTCTimestamp;

        seriesInstanceRef.current?.update(dataPoint);

        prevData = dataPoint;
        currentIndex = (currentIndex + 1) % formattedData.length;
      };

      const intervalId = setInterval(addDataPoint, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [formattedData, currentIndex]);

  return (
    <div className={styles.chartContainerWrapper}>
      <div className={styles.chartContainer} ref={chartContainerRef} />
    </div>
  );
};

type CandlestickFormatData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export default OHLCPage;
