import { useEffect, useRef, useState } from "react";

import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

import { convertToOHLC } from "@/Common/Components/Utils/convertToOhlc";

import importedData1 from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";
import importedData2 from "@/Assets/BANKNIFTY2360843500PE(2023-06-01).json";
import importedData3 from "@/Assets/BANKNIFTY2361543500CE(2023-06-01).json";

import { convertDataToChartType, getTimeFrame } from "../MultipleInstruments/multipleInstruments.helper";

export const useOhlcChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [selectStock, setSelectStock] = useState(
    "BANKNIFTY2360843500CE(2023-06-01)"
  );
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
    const fetchData = async () => {
      const selectedStockData = getSelectedStock(selectStock);
      const ohlcData = convertToOHLC(selectedStockData, getTimeFrame(timeFrame));
      const formattedData = ohlcData.map((value) => ({
        time: (new Date(value.time).getTime() / 1000) as UTCTimestamp,
        open: value.open,
        high: value.high,
        low: value.low,
        close: value.close,
      }));
      setFormattedData(formattedData);
    };

    fetchData();
  }, [selectStock, timeFrame]);

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
      } else {
        seriesInstanceRef.current?.setData([]);
      }

      seriesInstanceRef.current?.setData(formattedData);

      let prevData: CandlestickFormatData = formattedData.slice(-1)[0];
      let currentIndex = 0;

      const updatedData = () => {
        const currentIndexCopy = currentIndex;
        const dataPoint = formattedData[currentIndexCopy];

        if (prevData.time > dataPoint.time)
          dataPoint.time = (prevData.time + 1) as UTCTimestamp;

        seriesInstanceRef.current?.update(dataPoint);

        prevData = dataPoint;
        currentIndex = (currentIndex + 1) % formattedData.length;
      };

      const intervalId = setInterval(updatedData, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [formattedData]);

  return {
    chartContainerRef,
    selectStock,
    setSelectStock,
    timeFrame,
    setTimeFrame,
  };
};

type CandlestickFormatData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};
