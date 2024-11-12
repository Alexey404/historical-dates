import React from "react";
import "./app.scss";
import { HistoricalDates } from "./components/HistoricalDates/HistoricalDates";
import { histoticalData } from "./constants/histoticalData";

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <HistoricalDates contentItems={histoticalData} />
        {/* <HistoricalDates contentItems={histoticalData} /> */}
      </div>
    </div>
  );
};
