import { UTCTimestamp } from "lightweight-charts";

import {
  ChartDataType,
  OHLCDataType,
} from "@/Common/Components/Utils/convertToOhlc";

import { CandlestickFormatData } from "./useMultipleInstruments";

export const getFormattedData = (
  stocksData: OHLCDataType[][]
): CandlestickFormatData[] => {

  const formattedData: CandlestickFormatData[] = [];

  const maxDataPoints = Math.max(
    ...stocksData.map((stockData) => stockData.length)
  );

  for (let index = 0; index < maxDataPoints; index++) {
    const dataPoint: CandlestickFormatData = {
      time: 0 as UTCTimestamp,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
    };

    stocksData.forEach((stockData) => {
      const ohlcData = stockData[index];

      if (ohlcData) {
        dataPoint.time = (new Date(ohlcData.time).getTime() / 1000) as UTCTimestamp;
        dataPoint.open += ohlcData.open;
        dataPoint.high += ohlcData.high;
        dataPoint.low += ohlcData.low;
        dataPoint.close += ohlcData.close;
      }
    });

    dataPoint.open /= stocksData.length;
    dataPoint.high /= stocksData.length;
    dataPoint.low /= stocksData.length;
    dataPoint.close /= stocksData.length;

    formattedData.push(dataPoint);
  }

  return formattedData;
};

export const getTimeFrame = (timeFrame: string) => {
  return Number(timeFrame.slice(0, -4));
};
export const convertDataToChartType = (importedData: any[]) => {
  const modifiedArray: ChartDataType[] = importedData.map(
    ([timestamp, ltp, totalVolume]) => [
      String(timestamp),
      Number(ltp),
      Number(totalVolume),
    ]
  );

  return modifiedArray;
};
