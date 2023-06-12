import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

import {
  convertToOHLC,
} from "@/Common/Components/Utils/convertToOhlc";

import importedData1 from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";
import importedData2 from "@/Assets/BANKNIFTY2360843500PE(2023-06-01).json";
import importedData3 from "@/Assets/BANKNIFTY2361543500CE(2023-06-01).json";

import {
  convertDataToChartType,
  getFormattedData,
  getTimeFrame,
} from "./multipleInstruments.helper";
import { STOCKS_LIST } from "@/Common/constants";

export const useMultipleInstruments = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [selectedStocks, setSelectedStocks] = useState<string[]>([...STOCKS_LIST]);
  const [timeFrame, setTimeFrame] = useState("1 Min");

  const [formattedData, setFormattedData] = useState<CandlestickFormatData[]>([]);

  const getSelectedStock = (selectedStock: string) => {
    switch (selectedStock) {
      case "BANKNIFTY2360843500CE(2023-06-01)": {
        return convertDataToChartType(importedData1);
      }

      case "BANKNIFTY2360843500PE(2023-06-01)": {
        return convertDataToChartType(importedData2);
      }

      case "BANKNIFTY2361543500CE(2023-06-01)": {
        return convertDataToChartType(importedData3);
      }

      default: {
        return [];
      }
    }
  };
  useEffect(() => {
    const stockData = selectedStocks.map(stock => convertToOHLC(getSelectedStock(stock), getTimeFrame(timeFrame)));
    setFormattedData(getFormattedData(stockData));

  }, [timeFrame, selectedStocks]);
  

  let prevData: CandlestickFormatData = formattedData.slice(-1)[0];
  let currentIndex = 0;
  let intervalId: string | number | NodeJS.Timeout | undefined;

  const clearChart = () => {
    if (seriesInstanceRef.current) {
      seriesInstanceRef.current.setData([]);
    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
    }
  };

  useEffect(() => {
    clearChart();

    if (chartContainerRef.current && formattedData.length > 0) {
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
      
      formattedData.length && candlestickSeries.setData(formattedData);

      const addDataPoint = () => {
        const currentIndexCopy = currentIndex;
        const dataPoint = formattedData[currentIndexCopy];

        if (prevData.time > dataPoint.time)
          dataPoint.time = (prevData.time + 1) as UTCTimestamp;

        seriesInstanceRef.current?.update(dataPoint);

        prevData = dataPoint;
        currentIndex = (currentIndex + 1) % formattedData.length;
      };

      intervalId = setInterval(addDataPoint, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [formattedData]);

  return {
    chartContainerRef,
    timeFrame,
    setTimeFrame,
    selectedStocks,
    setSelectedStocks
  };
};

export type CandlestickFormatData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};
