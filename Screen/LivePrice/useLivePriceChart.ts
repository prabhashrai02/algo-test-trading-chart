import { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  UTCTimestamp,
} from "lightweight-charts";

import data from "@/Assets/BANKNIFTY2360843500CE(2023-06-01).json";

export const useLivePriceChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const seriesInstanceRef = useRef<ISeriesApi<"Line"> | null>(null);

  let currentIndex = 0;

  
  const formattedData = data.map(([timestamp, value]) => ({
    time: (new Date(timestamp).getTime() / 1000) as UTCTimestamp,
    value: Number(value) / 1000,
  }));
  
  let prevData: LineChartFormatData = formattedData.slice(-1)[0];

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        rightPriceScale: { visible: true },
        timeScale: { timeVisible: true, secondsVisible: true },
      });

      chartInstanceRef.current = chart;

      const lineSeries = chart.addLineSeries();

      seriesInstanceRef.current = lineSeries;

      lineSeries.setData(formattedData);

      const updateData = () => {
        currentIndex = (currentIndex + 1) % data.length;

        const newData = data[currentIndex];

        const updatedData = {
          time: (new Date(newData[0]).getTime() / 1000) as UTCTimestamp,
          value: Number(newData[1]) / 1000,
        };

        if (prevData.time > updatedData.time)
          updatedData.time = (prevData.time + 1) as UTCTimestamp;

        lineSeries.update(updatedData);

        prevData = updatedData;
      };

      const intervalId = setInterval(updateData, 1000);

      return () => {
        clearInterval(intervalId);

        if (chartInstanceRef.current) {
          chartInstanceRef.current.remove();
          chartInstanceRef.current = null;
          seriesInstanceRef.current = null;
        }
      };
    }
  }, []);

  return {
    chartContainerRef,
  };
};

type LineChartFormatData = {
  time: UTCTimestamp;
  value: number;
};
