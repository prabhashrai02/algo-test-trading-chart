import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi, LineData, UTCTimestamp } from "lightweight-charts";

import data from '@/Assets/BANKNIFTY2360843500CE(2023-06-01).json';

export const useStaticChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        rightPriceScale: { visible: true },
        timeScale: { timeVisible: true, secondsVisible: true },
      });

      chartInstanceRef.current = chart;

      const lineSeries = chart.addLineSeries();

      seriesInstanceRef.current = lineSeries;

      const formattedData = data.map(([timestamp, value]) => ({
        time: (new Date(timestamp).getTime() / 1000) as UTCTimestamp,
        value: Number(value) / 1000,
      }));

      lineSeries.setData(formattedData);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
        seriesInstanceRef.current = null;
      }
    };
  }, [data]);

  return {
    chartContainerRef,
  };
};