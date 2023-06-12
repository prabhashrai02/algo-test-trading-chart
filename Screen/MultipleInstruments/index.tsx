import React, { useEffect, useRef } from "react";

import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

import { ChartDataType, convertToOHLC } from "@/Common/convertToOhlc";

import importedData1 from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";
import importedData2 from "@/Assets/BANKNIFTY2360843500PE(2023-06-01).json";

import styles from "./multipleInstruments.module.css";

const MultipleInstruments = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const data1: ChartDataType[] = importedData1.map(
    ([timestamp, ltp, totalVolume]) => [
      String(timestamp),
      Number(ltp),
      Number(totalVolume),
    ]
  );

  const data2: ChartDataType[] = importedData2.map(
    ([timestamp, ltp, totalVolume]) => [
      String(timestamp),
      Number(ltp),
      Number(totalVolume),
    ]
  );

  const ohlc1minIns1 = convertToOHLC(data1, 15);
  const ohlc1minIns2 = convertToOHLC(data2, 15);

  const formattedData: CandlestickFormatData[] = [];

  for (let index = 0; index < ohlc1minIns1.length; index++) {
    const Ins1Data = {
      time: (new Date(ohlc1minIns1[index].time).getTime() /
        1000) as UTCTimestamp,
      open: ohlc1minIns1[index].open,
      high: ohlc1minIns1[index].high,
      low: ohlc1minIns1[index].low,
      close: ohlc1minIns1[index].close,
    };

    const Ins2Data = {
      time: (new Date(ohlc1minIns2[index].time).getTime() /
        1000) as UTCTimestamp,
      open: ohlc1minIns2[index].open,
      high: ohlc1minIns2[index].high,
      low: ohlc1minIns2[index].low,
      close: ohlc1minIns2[index].close,
    };

    formattedData.push({
      time: (new Date(Ins1Data.time).getTime() / 1000) as UTCTimestamp,
      open: Ins1Data.open + Ins2Data.open,
      high: Ins1Data.high + Ins2Data.high,
      low: Ins1Data.low + Ins2Data.low,
      close: Ins1Data.close + Ins2Data.close,
    });
  }

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

export default MultipleInstruments;
