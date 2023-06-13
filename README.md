
# TradingView Charting Library Project

This project implements the TradingView Charting Library using the Lightweight Charts library. It provides functionality to display and analyze financial data in the form of charts. The project consists of multiple phases, each building upon the previous phase to enhance the charting capabilities.

## Project Structure

Library: TradingView Charting Library is used as the foundation for the project.
Data1: Contains the financial data for instrument 1 in the format [Timestamp, LTP*1000, TotalVolume].
Data2: Contains the financial data for instrument 2 in the format [Timestamp, LTP*1000, TotalVolume].
Data3: Contains the financial data for instrument 3 in the format [Timestamp, LTP*1000, TotalVolume].


## Phase I: Static Chart

In this phase, a NextJS application is created, and the Lightweight Charts library is installed. The application renders the data from Data1 on a static chart, providing a visual representation of how the price changed during the day for instrument 1.

## Phase II: Live Price

To cater to users who want to see live data during market hours, this phase emulates the component to fetch data from a WebSocket. It ensures that the entire component doesn't rerender on every update, optimizing performance. The chart dynamically updates with live prices for instrument 1.

## Phase III: OHLC

Since displaying per-second data on the chart can be overwhelming, this phase converts the data into OHLC (Open High Low Close) format based on the specified resolution (e.g., 1min, 5min, 30min). The chart is then displayed in the OHLC format, providing a clearer view of the instrument's price movements. This phase also includes the features implemented in previous phases.

## Phase IV: Multiple Instruments

To address user requirements for combining multiple instruments in a single chart, this phase introduces the ability to select and display data from multiple instruments simultaneously. A generalized function adds up prices at the same timestamp, considering the resolution of the chart. It returns a combined OHLC array for the selected instruments. Users can dynamically update the chart to visualize multiple instruments together. All features from previous phases are included in this phase.

Please note that this README provides an overview of the project's phases and their objectives. For detailed implementation and usage instructions, please refer to the code.

# Screenshots

![image](https://github.com/prabhashrai02/algo-test-trading-chart/assets/73634195/bcaf0670-4159-43fa-92fb-b652f6ecbdb6)

![image](https://github.com/prabhashrai02/algo-test-trading-chart/assets/73634195/fde4f238-9261-4988-8857-e9ff25461cc7)

