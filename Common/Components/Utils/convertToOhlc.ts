export const convertToOHLC = (data: ChartDataType[], timeframe: number): OHLCDataType[] => {
  const ohlcData: OHLCDataType[] = [];

  let startTime = new Date(data[0][0]);
  let endTime = new Date(startTime.getTime() + timeframe * 60 * 1000);
  let open = data[0][1] / 1000;
  let high = open;
  let low = open;
  let close = open;

  for (let i = 1; i < data.length; i++) {
    const [timestamp, ltp] = data[i];
    const LTP = ltp / 1000;

    const currentTime = new Date(timestamp);

    if (currentTime >= startTime && currentTime < endTime) {
      high = Math.max(high, LTP);
      low = Math.min(low, LTP);
      close = LTP;
    } else {
      ohlcData.push({
        time: startTime.toISOString(),
        open,
        high,
        low,
        close,
      });

      startTime = endTime;
      endTime = new Date(startTime.getTime() + timeframe * 60 * 1000);
      open = LTP;
      high = LTP;
      low = LTP;
      close = LTP;
    }
  }

  ohlcData.push({
    time: startTime.toISOString(),
    open,
    high,
    low,
    close,
  });

  return ohlcData;
};

export type ChartDataType = [string, number, number];

export type OHLCDataType = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};
