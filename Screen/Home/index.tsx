"use client";

import MultipleInstruments from "../MultipleInstruments";
import OHLCPage from "../OHLC";
import StaticChart from "../StaticChart";

const Home = () => {
    return (
        <>
            <MultipleInstruments />
            <OHLCPage />
            <StaticChart />
        </>
    )
}

export default Home;