"use client";

import React, { useState } from "react";

import Navbar from "@/Common/Components/Navbar";

import LivePrice from "../LivePrice";
import MultipleInstruments from "../MultipleInstruments";
import OHLCPage from "../OHLC";
import StaticChart from "../StaticChart";

import styles from "./home.module.css";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(0);

  const navbarItems = [
    { title: "Static Chart", component: StaticChart },
    { title: "Live Price", component: LivePrice },
    { title: "OHLC", component: OHLCPage },
    { title: "Multiple Instruments", component: MultipleInstruments },
  ];

  return (
    <>
      <Navbar
        items={navbarItems.map((item) => item.title)}
        setActiveComponent={setActiveComponent}
      />
      {navbarItems.map((item, index) => (
        <div key={index} className={styles.page}>
          {activeComponent === index && <item.component />}
        </div>
      ))}
    </>
  );
};

export default Home;