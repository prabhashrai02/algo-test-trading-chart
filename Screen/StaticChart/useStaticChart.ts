import { useEffect, useRef } from "react";

import {
  createChart,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

import { ChartDataType, convertToOHLC } from "@/Common/convertToOhlc";

import importedData from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";


export const useStaticChart = () => {

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

  const ohlc1min = convertToOHLC(data, 1);

  useEffect(() => {
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

      const formattedData = ohlc1min.map((value) => ({
        time: (new Date(value.time).getTime() / 1000) as UTCTimestamp,
        open: value.open,
        high: value.high,
        low: value.low,
        close: value.close,
      }));

      candlestickSeries.setData(formattedData);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
        seriesInstanceRef.current = null;
      }
    };
  }, []);

  return {
    chartContainerRef
  }
}