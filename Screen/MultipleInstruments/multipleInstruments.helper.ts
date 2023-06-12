import { UTCTimestamp } from "lightweight-charts";

import { ChartDataType, OHLCDataType } from "@/Common/Components/Utils/convertToOhlc";

import { CandlestickFormatData } from "./useMultipleInstruments";

export const getFormattedData = (
  ohlcIns1: OHLCDataType[],
  ohlcIns2: OHLCDataType[]
) => {
  const formattedData: CandlestickFormatData[] = [];

  for (let index = 0; index < ohlcIns1.length; index++) {
    const ins1Data = {
      time: (new Date(ohlcIns1[index].time).getTime() / 1000) as UTCTimestamp,
      open: ohlcIns1[index].open,
      high: ohlcIns1[index].high,
      low: ohlcIns1[index].low,
      close: ohlcIns1[index].close,
    };

    const ins2Data = {
      time: (new Date(ohlcIns2[index].time).getTime() / 1000) as UTCTimestamp,
      open: ohlcIns2[index].open,
      high: ohlcIns2[index].high,
      low: ohlcIns2[index].low,
      close: ohlcIns2[index].close,
    };

    formattedData.push({
      time: ins1Data.time,
      open: ins1Data.open + ins2Data.open,
      high: ins1Data.high + ins2Data.high,
      low: ins1Data.low + ins2Data.low,
      close: ins1Data.close + ins2Data.close,
    });
  }

  return formattedData;
};

export const getTimeFrame = (timeFrame: string) => {
  return Number(timeFrame.slice(0, -4));
};

export const convertDataToChartType = (importedData: any[]) => {
    const modifiedArray: ChartDataType[] = importedData.map(([timestamp, ltp, totalVolume]) => [
        String(timestamp),
        Number(ltp),
        Number(totalVolume),
    ]);

    return modifiedArray;
};