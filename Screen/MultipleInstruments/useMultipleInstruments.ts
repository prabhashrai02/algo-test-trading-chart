import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

import {
  ChartDataType,
  convertToOHLC,
  OHLCDataType,
} from "@/Common/Components/Utils/convertToOhlc";

import importedData1 from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";
import importedData2 from "@/Assets/BANKNIFTY2360843500PE(2023-06-01).json";
import importedData3 from "@/Assets/BANKNIFTY2361543500CE(2023-06-01).json";

import {
  convertDataToChartType,
  getFormattedData,
  getTimeFrame,
} from "./multipleInstruments.helper";

export const useMultipleInstruments = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [selectFirstStock, setSelectFirstStock] = useState(
    "BANKNIFTY2360843500CE(2023-06-01)"
  );
  const [selectSecondStock, setSelectSecondStock] = useState(
    "BANKNIFTY2360843500CE(2023-06-01)"
  );
  const [timeFrame, setTimeFrame] = useState("1 Min");
  const [firstStock, setFirstStock] = useState<OHLCDataType[]>([]);
  const [secondStock, setSecondStock] = useState<OHLCDataType[]>([]);
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
    setFirstStock(
      convertToOHLC(getSelectedStock(selectFirstStock), getTimeFrame(timeFrame))
    );
    setSecondStock(
      convertToOHLC(getSelectedStock(selectSecondStock), getTimeFrame(timeFrame))
    );
  }, [timeFrame, selectFirstStock, selectSecondStock]);

  useEffect(() => {
    setFormattedData(getFormattedData(firstStock, secondStock));
  }, [firstStock, secondStock]);

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

    if (chartContainerRef.current) {
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
      candlestickSeries.setData(formattedData);

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
    selectFirstStock,
    setSelectFirstStock,
    selectSecondStock,
    setSelectSecondStock,
    timeFrame,
    setTimeFrame,
  };
};

export type CandlestickFormatData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};
